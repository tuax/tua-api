module.exports = {
  bail: true,
  clearMocks: true,
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@examples/(.*)$': '<rootDir>/examples/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
  ],
}
