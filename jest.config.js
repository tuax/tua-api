module.exports = {
    bail: true,
    clearMocks: true,
    transform: {
        '^.+\\.[j|t]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        '@examples/(.*)$': '<rootDir>/examples/$1',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**',
        '!src/index.d.ts',
    ],
}
