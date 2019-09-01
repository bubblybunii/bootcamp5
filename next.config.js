/* eslint-disable */
const withLess = require('@zeit/next-less')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
}))
