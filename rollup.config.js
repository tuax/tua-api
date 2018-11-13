import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    input: 'src/TuaApi.js',
    output: [{
        file: 'dist/umd.js',
        name: 'TuaApi',
        format: 'umd',
        exports: 'named',
        globals: {
            axios: 'axios',
            'fetch-jsonp': 'fetchJsonp',
        },
    }, {
        file: 'dist/es.js',
        format: 'es',
    }],
    plugins: [
        eslint(),
        json(),
        nodeResolve(),
        babel(),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('prod'),
        }),
    ],
    external: ['axios', 'fetch-jsonp'],
}
