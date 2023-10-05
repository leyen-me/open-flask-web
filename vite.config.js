import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const { VITE_APP_ENV } = loadEnv(mode, process.cwd())
    return {
        base: VITE_APP_ENV === 'production' ? './' : '/',
        plugins: [vue(), vueSetupExtend()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '~': fileURLToPath(new URL('./', import.meta.url))
            }
        }
    }
})
