
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:400,500&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/api',
    '~/plugins/directives'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    proxyHeaders: false,
    // prefix: "https://oauth.reddit.com"
  },
  proxy: {
    '/reddit/': {
      target: "https://oauth.reddit.com",
      pathRewrite: { '^/reddit/': '' }
    },
    '/reddit_auth/': {
      target: "https://www.reddit.com",
      pathRewrite: { '^/reddit_auth/': '' }
    }
  },
  env: {
    REDDIT_LOGIN_URL: "https://www.reddit.com/api/v1/authorize?client_id=aSA1rUft7sPCxQ&response_type=code&state=mischief&redirect_uri=http://localhost:3000&duration=permanent&scope=identity,edit,mysubreddits,read,save,submit,subscribe,vote",
    REDIRECT_URI: "http://localhost:3000",
    BASIC_AUTH: "Basic YVNBMXJVZnQ3c1BDeFE6VXJCMnYyc040Z29VTDB2TGNGb1daeDJqSFM4"
  },
  router: {
    middleware: ['auth']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
