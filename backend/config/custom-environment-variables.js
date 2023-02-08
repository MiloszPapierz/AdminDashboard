module.exports = {
  env: "NODE_ENV",
  port: "PORT",
  database: {
    host: "DATABASE_HOST",
    port: "DATABASE_PORT",
    user: "DATABASE_USER",
    password: "DATABASE_PASSWORD",
    name: "DATABASE_NAME",
  },
  cloudinary: {
    name: "CLOUDINARY_NAME",
    key: "CLOUDINARY_KEY",
    secret: "CLOUDINARY_SECRET",
  },
  auth: {
    jwksUri: "AUTH_JWKS_URI",
    audience: "AUTH_AUDIENCE",
    issuer: "AUTH_ISSUER",
    tokenUrl: "AUTH_TOKEN_URL",
    clientId: "AUTH_CLIENT_ID",
    clientSecret: "AUTH_CLIENT_SECRET",
    testUser: {
      userId: "AUTH_TEST_USER_USER_ID",
      username: "AUTH_TEST_USER_USERNAME",
      password: "AUTH_TEST_USER_PASSWORD",
    },
  },
};
