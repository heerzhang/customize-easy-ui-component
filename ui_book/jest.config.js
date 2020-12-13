const { defaults } = require('jest-config')

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx','node'],
  modulePaths: [
    'src',
  ],
  roots: [
    './src',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['dist', '/node_modules/'],
  testMatch: [
    '**/__tests__/**/*.+(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
