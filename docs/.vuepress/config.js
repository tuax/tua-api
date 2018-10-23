module.exports = {
    base: '/tua-api/',
    locales: {
        '/': {
            title: 'tua-api',
            description: '🏗 一款可配置的通用 api 请求函数生成工具'
        }
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
    ],
    serviceWorker: true,
    themeConfig: {
        repo: 'tuateam/tua-api',
        docsDir: 'docs',
        editLinks: true,
        lastUpdated: '上次更新',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
            {
                text: '快速上手',
                link: '/quick-start/',
            },
            {
                text: '配置',
                link: '/config/',
            },
            {
                text: '生态系统',
                items: [
                    { text: '本地存储', link: 'https://tuateam.github.io/tua-storage/' },
                    { text: '小程序框架', link: 'https://tuateam.github.io/tua-mp/' },
                ],
            },
        ],
        sidebar: {
            '/quick-start/': [
                {
                    title: '快速上手',
                    collapsable: false,
                    children: [
                        'installation',
                        '',
                        'middleware',
                        'export-utils',
                        '../config/',
                    ],
                },
            ],
            '/config/': [
                {
                    title: '配置',
                    collapsable: false,
                    children: [
                        '',
                        'default',
                        'detail',
                        'own',
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
