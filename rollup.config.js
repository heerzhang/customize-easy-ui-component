import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
//import multi from '@rollup/plugin-multi-entry'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
//若只作tsc是不报错的，rollup -c 会报错
import json from "@rollup/plugin-json";


const input = "esm/index.js";
//直接ts|tsx做输入,Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)

export default {
	external: [
		'react',
		'react-dom',
		/@babel\/runtime/,
	],
    input,
    output: [
        {
            dir: 'dist',
            format: 'es',
            sourcemap: true,
        },
    ],
	plugins: [
        json(),
		babel({
			babelHelpers: 'runtime',
			exclude: "node_modules/**",
		}),
		commonjs(),
	//	multi(),
		nodeResolve(),
		typescript(),
	],
	preserveModules: true
}


//若使用rollup -c 可以对依赖包的缺失给出提示，其它两种tsc都不报错；Circular dependencies等告警;
//无法生成UMD Error: UMD and IIFE output formats are not supported for code-splitting builds.
