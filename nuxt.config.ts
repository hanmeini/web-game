// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      rawgApiKey: process.env.NUXT_PUBLIC_RAWG_API_KEY,
    }
  },
  css: ["~/assets/css/main.css"],
});
