module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["<rootDir>jest.setup.js"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
};