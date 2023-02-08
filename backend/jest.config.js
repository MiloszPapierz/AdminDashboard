module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: ["**/__tests__/**/*.spec.js"],
  globalSetup: "./__tests__/global.setup.js",
  globalTeardown: "./__tests__/global.teardown.js",
};
