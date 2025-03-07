import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // Otros módulos pueden ir aquí
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  // Extender las rutas
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'login',
        path: '/login',
        file: '~/src/components/Login.vue'
      })
    }
  }
})
