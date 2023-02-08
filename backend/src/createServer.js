const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaCors = require("@koa/cors");
const config = require("config");
const { getLogger, initializeLogger } = require("./core/logging");
const {
  initializeDatabaseConnection,
  destroyDatabaseConnection,
} = require("./data/index");
const initializeRouter = require("./rest/index");
const { initializeCloudinary } = require("./core/cloudinary");
const emoji = require("node-emoji");
const { serializeError } = require("serialize-error");
const ServiceError = require("./core/serviceError");
const { checkJwtToken } = require("./core/auth");

const NODE_ENV = config.get("env");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");
const CORS_ORIGINS = config.get("cors.origins");
const CORS_MAX_AGE = config.get("cors.maxAge");

module.exports = async function createServer() {
  const app = new Koa();

  initializeLogger({ level: LOG_LEVEL, disabled: LOG_DISABLED });
  const logger = getLogger();
  initializeCloudinary();

  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }

        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-type", "Authorization"],
      maxAge: CORS_MAX_AGE,
    })
  );
  app.use(checkJwtToken());

  app.use(bodyParser());

  initializeDatabaseConnection();
  app.use(async (ctx, next) => {
    const logger = getLogger();
    logger.info(`${emoji.get("fast_forward")} ${ctx.method} ${ctx.URL}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get("skull");
      if (ctx.status >= 400) return emoji.get("x");
      if (ctx.status >= 300) return emoji.get("rocket");
      if (ctx.status >= 200) return emoji.get("white_check_mark");
      return emoji.get("rewind");
    };

    try {
      await next();

      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.URL}`);
    } catch (error) {
      logger.error(`${emoji.get("x")} ${ctx.method} ${ctx.status} ${ctx.URL}`, {
        error,
      });

      throw error;
    }
  });

  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: "NOT_FOUND",
          message: `Unknown resource: ${ctx.url}`,
        };
        ctx.status = 404;
      }
    } catch (error) {
      const logger = getLogger();
      logger.error("Error occured while handling a request", {
        error: serializeError(error),
      });

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || "INTERNAL_SERVER_ERROR",
        messege: error.message,
        details: error.details || {},
        stack: NODE_ENV !== "production" ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }
      }

      if (ctx.state.jwtOriginalError) {
        statusCode = 401;
        errorBody.code = "UNAUTHORIZED";
        errorBody.messege = ctx.state.jwtOriginalError.message;
        errorBody.details.jwtOriginalError = serializeError(
          ctx.state.jwtOriginalError
        );
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  initializeRouter(app);

  return {
    getApp() {
      return app;
    },
    start() {
      return new Promise((resolve) => {
        app.listen(config.get("port"));
        logger.info(`🚀 App listening on port ${config.get("port")}`);
        resolve();
      });
    },
    async stop() {
      app.removeAllListeners();
      await destroyDatabaseConnection();
      getLogger().info("Goodbye");
    },
  };
};
