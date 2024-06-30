// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  pages:true,
  ssr:false,
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    'nuxt-icon-tw',
    '@vueuse/nuxt',
  ],


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


})