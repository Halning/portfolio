// jest.app.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/dist'],
  testRunner: 'jest-jasmine2'
};
