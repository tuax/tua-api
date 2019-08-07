const presets = [
    [
        '@babel/preset-env',
        { targets: { node: 'current' } },
    ],
]
const plugins = [
    [
        '@babel/plugin-proposal-decorators',
        { legacy: true },
    ],
    '@babel/plugin-proposal-object-rest-spread',
]

module.exports = {
    env: {
        dev: { presets, plugins },
        test: { presets, plugins },
        production: {
            presets: [
                [
                    '@babel/preset-env',
                    { modules: false },
                ],
            ],
            plugins,
        },
    },
}
