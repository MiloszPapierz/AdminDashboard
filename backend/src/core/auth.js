const jwksrsa = require("jwks-rsa");
const jwt = require("koa-jwt");
const config = require("config");
const { getLogger } = require("./logging");

function getJwtSecret() {
  const logger = getLogger();
  try {
    let secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get("auth.jwksUri"),
      cache: true,
      cacheMaxEntries: 5,
    });
    return secretFunction;
  } catch (error) {
    logger.error("Something went wrong when handling the JWT secret", {
      error,
    });
    throw error;
  }
}

function checkJwtToken() {
  const logger = getLogger();
  try {
    let secretFunction = getJwtSecret();

    return jwt({
      secret: secretFunction,
      audience: config.get("auth.audience"),
      issuer: config.get("auth.issuer"),
      algorithms: ["RS256"],
      passthrough: true,
    });
  } catch (error) {
    logger.error("Something went wrong while checking the JWT", { error });
    throw error;
  }
}

function hasPermission() {
  return async (ctx, next) => {
    const logger = getLogger();
    const user = ctx.state.user;
    logger.debug(`hasPermission: ${JSON.stringify(user)}`);

    if (user) {
      await next();
    } else {
      ctx.throw(
        403,
        "You are not authorized to view this part of the application",
        {
          code: "FORBIDDEN",
        }
      );
    }
  };
}

module.exports = {
  checkJwtToken,
  hasPermission,
};
