const { name } = require('../../package.json')

const description = '🏗 一款可配置的通用 api 请求函数生成工具'

module.exports = {
    base: '/' + name + '/',
    locales: {
        '/': { title: name, description },
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
    ],
    evergreen: true,
    serviceWorker: true,
    themeConfig: {
        repo: 'tuateam/tua-api',
        docsDir: 'docs',
        editLinks: true,
        lastUpdated: '上次更新',
        sidebarDepth: 2,
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
            {
                text: '🌱指南',
                link: '/guide/',
            },
            {
                text: '⚙️配置',
                link: '/config/',
            },
            {
                text: '🔥生态系统',
                items: [
                    { text: '📦本地存储', link: 'https://tuateam.github.io/tua-storage/' },
                    { text: '🖖小程序框架', link: 'https://tuateam.github.io/tua-mp/' },
                ],
            },
        ],
        sidebar: {
            '/guide/': [
                {
                    title: '🌱指南',
                    collapsable: false,
                    children: [
                        'installation',
                        '',
                        'middleware',
                        'mock',
                        'export-utils',
                        'form-data',
                        '../config/',
                    ],
                },
            ],
            '/config/': [
                {
                    title: '⚙️配置',
                    collapsable: false,
                    children: [
                        '',
                        'default',
                        'common',
                        'self',
                        'runtime',
                    ],
                },
            ],
        },
        serviceWorker: {
            updatePopup: {
                message: 'New content is available.',
                buttonText: 'Refresh',
            },
        },
    },
}
