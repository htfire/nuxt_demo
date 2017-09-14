// const apiConfig = require('./env.config')
var config = require('./config')
const webpack = require('webpack')

var env = process.env.NODE_ENV === 'production' ? config.build.prodEnv : process.env.NODE_ENV === 'development' ? config.build.devEnv:config.build.testEnv;
// console.log(env.BASE_URL)
module.exports = {
//   env: {
//     baseUrl: env.BASE_URL || 'http://localhost:3000'
//   },
  dev: (process.env.NODE_ENV !== 'production'),
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/filters.js' },
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: '兔博士-岂止是超好的查房价',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '兔博士-岂止是超好的查房价' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    // publicPath: 'http://sharetest2.2boss.cn/vuessr',
    vendor: ['axios'], // Add axios in the vendor.bundle.js
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
        config.devtool = 'eval-source-map'
      }
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
          'process.env': env
        })
    ]
  }
}
