import { config } from 'dotenv';
import { defaultExclude, defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        exclude: ['**/test*/**', ...defaultExclude],
        env: {
            ...config({ path: '.env.test' }).parsed,
        },
    },
    plugins: [
        swc.vite({
            sourceMaps: true,
            jsc: {
                minify: {
                    sourceMap: true,
                    mangle: false,
                    compress: false,
                    keep_classnames: true,
                    keep_fnames: true,
                },
            },
            module: {
                type: 'es6',
            },
        }),
    ],
});
