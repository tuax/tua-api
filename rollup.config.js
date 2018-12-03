import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'

const output = {
    es: {
        file: 'dist/TuaApi.es.js',
        format: 'es',
    },
    umd: {
        file: 'dist/TuaApi.umd.js',
        name: 'TuaApi',
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
    babel(),
    commonjs(),
    replace({
        'process.env.NODE_ENV': JSON.stringify('prod'),
    }),
]
const external = ['axios', 'fetch-jsonp']

export default [{
    input: 'src/TuaApi.js',
    output: [ output.es, output.umd ],
    plugins,
    external,
}, {
    input: 'src/TuaApi.js',
    output: {
        ...output.umd,
        file: 'dist/TuaApi.umd.min.js',
    },
    plugins: [ ...plugins, uglify() ],
    external,
}]
