const knex = require("knex");
const { getLogger } = require("../core/logging");
const config = require("config");
const { join } = require("path");

let knexInstance;

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");
const DATABASE_USER = config.get("database.user");
const DATABASE_PASSWORD = config.get("database.password");
const DATABASE_NAME = config.get("database.name");

const getKnexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else if (message.length && message.forEach) {
    message.forEach((innerMessage) =>
      logger.log(
        level,
        innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)
      )
    );
  } else {
    logger.log(level, JSON.stringify(message));
  }
};

const getKnex = () => {
  if (!knexInstance) {
    throw new Error("First initialize knex before you start using it");
  }

  return knexInstance;
};

const initializeDatabaseConnection = async () => {
  const logger = getLogger();
  logger.info("Initializing connection with the database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    debug: isDevelopment,
    log: {
      debug: getKnexLogger(logger, "debug"),
      error: getKnexLogger(logger, "error"),
      warn: getKnexLogger(logger, "warn"),
      deprecate: (method, alternative) =>
        logger.warn("Knex reported something deprecated", {
          method,
          alternative,
        }),
    },
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
  } catch (error) {
    logger.error(error.message);
    console.log(error);
    throw new Error("Could not initialize connection with the database");
  }

  let migrationsFailed = true;
  try {
    logger.info("Start database migrations");
    await knexInstance.migrate.latest();
    logger.info("Database migrated successful");
    migrationsFailed = false;
  } catch (error) {
    console.log(error);
    logger.error("Error while migrating the database", error.message);
  }

  if (migrationsFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      logger.error("Error while undoing last migration", error.message);
    }

    throw new Error("Migrations failed");
  }

  if (isDevelopment) {
    try {
      logger.info("Start seeding the database");
      await knexInstance.seed.run();
      logger.info("Succesfully seedeed the database");
    } catch (error) {
      logger.error("Error while seeding the database", error);
    }
  }

  logger.info("Initialized connection with the database");
  return knexInstance;
};

const destroyDatabaseConnection = async () => {
  const logger = getLogger();

  logger.info("Closing the connecton with the database");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Database connection closed");
};

const tables = Object.freeze({
  product: "products",
  category: "categories",
  order: "orders",
  orderDetail: "orderDetails",
});

module.exports = {
  getKnex,
  initializeDatabaseConnection,
  tables,
  destroyDatabaseConnection,
};
