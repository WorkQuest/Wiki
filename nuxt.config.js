import localeEn from './locales/en.json'

require('dotenv').config()

export default {
  ssr: false,
  head: {
    title: 'WorkQuest Wiki',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.svg' }
    ]
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: ['./assets/scss/resourses.scss']
  },
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    '@nuxtjs/i18n',
  ],
  plugins: [
    { src: '@plugins/vee-validate.js' },
    { src: '@plugins/injectComponents.js' },
    { src: '@plugins/main.js' },
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    extend (config) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        en: localeEn
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true
    }
  },
  env: {
    exampleValue: process.env.EXAMPLE_VALUE
  }
}
