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

module.exports = withPlugins([
  [withCSS, cssConfig]
])