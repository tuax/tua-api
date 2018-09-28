import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    input: 'src/TuaApiMp.js',
    output: [{
        file: 'dist/mp.js',
        format: 'es',
    }],
    plugins: [
        eslint(),
        json(),
        nodeResolve(),
        babel({
            plugins: [['ramda', { useES: true }]],
        }),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('prod'),
        }),
    ],
}
