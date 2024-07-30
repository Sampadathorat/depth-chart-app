import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  bail: true,
  modulePathIgnorePatterns: [
    "dist/",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts', 
    '!**/node_modules/*',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'text-summary'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
   transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], 
  watchPathIgnorePatterns: ['/node_modules/', '/dist/'], 
  
};

export default config;
