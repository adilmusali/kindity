import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  setupFiles: ['<rootDir>/tests/setup/env.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/mongo.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  verbose: true,
  testTimeout: 30000,
  collectCoverageFrom: [
    'controllers/**/*.ts',
    'middleware/**/*.ts',
    'helpers/**/*.ts',
    '!**/node_modules/**',
  ],
};

export default config;
