// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vue-macros/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-quasar-ui',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
        ],
      },
    ],
    '@nuxt/devtools',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  // https://nuxt.com/modules/quasar
  quasar: {
    plugins: [
      'Dialog',
      'Notify',
      'Dark',
    ],
    extras: {
      fontIcons: ['material-icons'],
    },
  },

  // https://vue-macros.sxzz.moe/guide/configurations.html
  macros: {},

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },

  runtimeConfig: {
    jwtSecret: '',
  },

  // https://github.com/nuxt/devtools/blob/main/packages/devtools-kit/src/_types/module-options.ts
  devtools: {
    enabled: true,
  },
})
