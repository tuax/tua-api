import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const input = `src/index.js`
const banner = `/* ${pkg.name} version ${pkg.version} */`

const output = {
    cjs: {
        file: pkg.main,
        banner,
        format: 'cjs',
        exports: 'named',
    },
    esm: {
        file: pkg.module,
        banner,
        format: 'esm',
    },
    umd: {
        file: pkg.unpkg,
        name: 'TuaApi',
        banner,
        format: 'umd',
        exports: 'named',
        globals: {
            axios: 'axios',
            'fetch-jsonp': 'fetchJsonp',
        },
    },
}
const plugins = [
    eslint(),
    json(),
    nodeResolve(),
    commonjs(),
    babel(),
]
const env = 'process.env.NODE_ENV'
const external = ['axios', 'fetch-jsonp']

export default [{
    input,
    output: [output.cjs, output.esm],
    plugins,
    external,
}, {
    input,
    output: output.umd,
    external,
    plugins: [
        ...plugins,
        replace({ [env]: '"development"' }),
    ],
}, {
    input,
    output: {
        ...output.umd,
        file: 'dist/TuaApi.umd.min.js',
    },
    external,
    plugins: [
        ...plugins,
        replace({ [env]: '"production"' }),
        uglify(),
    ],
}]
