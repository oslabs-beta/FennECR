module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
    transform: {
      // '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.(ts|tsx)$': 'babel-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(d3-shape|d3-path|@mui/x-charts|@babel/runtime)/)',
    ],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // globals: {
    //   'ts-jest': {
    //     tsconfig: 'tsconfig.json',
    //   },
    // },
  };