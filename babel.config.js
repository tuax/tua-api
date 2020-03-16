module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    { targets: { node: 'current' } },
                ],
                '@babel/typescript',
            ],
            plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
            ],
        },
        production: {
            presets: [
                [
                    '@babel/preset-env',
                    { modules: false },
                ],
                '@babel/typescript',
            ],
            plugins: [
                '@babel/plugin-proposal-object-rest-spread',
            ],
        },
    },
}
