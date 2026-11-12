export default defineNuxtConfig({
  compatibilityDate: '2026-11-11',
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['@fontsource-variable/geist', '~/assets/css/main.css'],
  typescript: { strict: true },
  app: {
    head: {
      titleTemplate: '%s · Sumire Labs',
      link: [{ rel: 'icon', type: 'image/png', href: '/images/brand/sumire.png' }],
      meta: [{ name: 'theme-color', content: '#101418', media: '(prefers-color-scheme: dark)' }, { name: 'theme-color', content: '#F8F9FF', media: '(prefers-color-scheme: light)' }],
      script: [{ innerHTML: `try{const replay=['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).get('previewIntro')==='1';if(replay)document.documentElement.dataset.previewIntro='1';if(replay||!sessionStorage.getItem('sumire:intro'))document.documentElement.classList.add('intro-pending')}catch{}`, tagPosition: 'head' }],
    },
  },
  colorMode: { preference: 'system', fallback: 'light', classSuffix: '', storageKey: 'sumire:theme' },
  i18n: {
    baseUrl: 'https://sumirelabs.com',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'ja', language: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'th', language: 'th', name: 'ไทย', file: 'th.json' },
    ],
  },
  // This site deploys static assets. Workers Builds must not infer a server preset.
  nitro: { preset: 'static', prerender: { crawlLinks: true, failOnError: true, routes: ['/', '/ja', '/th'] } },
})
