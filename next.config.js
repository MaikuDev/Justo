// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const debug = process.env.NODE_ENV !== "production"

const cssConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  }
}

const nextConfiguration = {
  exportPathMap: function () {
    return {
      "/": { page: "/" }
    }
  },
  //assetPrefix: '',
  assetPrefix: !debug ? '/justo/' : '',
  webpack: (config, { dev }) => {
    // Perform customizations to webpack config
    // console.log('webpack');
    // console.log(config.module.rules, dev);
    config.module.rules = config.module.rules.map(rule => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })
    // Important: return the modified config
    return config
  }/*,
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // console.log('webpackDevMiddleware');
    // console.log(config);
    // Important: return the modified config
    return config
  }, */
}


module.exports = withPlugins([
  [withCSS, cssConfig]
], nextConfiguration)