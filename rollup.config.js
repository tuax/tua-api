import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const input = `src/TuaApi.js`
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
        file: 'dist/TuaApi.umd.js',
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
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
]
const external = ['axios', 'fetch-jsonp']

export default [{
    input,
    output: [ output.cjs, output.esm, output.umd ],
    plugins,
    external,
}, {
    input,
    output: {
        ...output.umd,
        file: 'dist/TuaApi.umd.min.js',
    },
    plugins: [ ...plugins, uglify() ],
    external,
}]
