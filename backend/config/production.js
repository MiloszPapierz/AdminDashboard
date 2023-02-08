module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  port: 9000,
  cors: {
    origins: ["https://dashboard-admin.onrender.com"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "dashboard",
  },
};
