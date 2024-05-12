import dotenv from "dotenv";

/**
 * Initialize environment variables.
 */
dotenv.config();

// The env variables that are used by the api
export default {
  // app
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,

  // database
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};
