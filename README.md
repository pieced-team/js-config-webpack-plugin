<h1 align="center">@pieced/js-config-webpack-plugin 👋</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@pieced/js-config-webpack-plugin" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@pieced/js-config-webpack-plugin.svg">
  </a>
  <a href="https://www.npmjs.com/package/@pieced/js-config-webpack-plugin" target="_blank">
    <img alt="Download" src="https://img.shields.io/npm/dm/@pieced/js-config-webpack-plugin.svg?color=blue" />
  </a>
  <a href="https://www.npmjs.com/package/@pieced/js-config-webpack-plugin" target="_blank">
  <img alt="Webpack" src="https://img.shields.io/badge/webpack->=5.0.0-blue">
  </a>
  <a href="https://www.npmjs.com/package/@pieced/js-config-webpack-plugin" target="_blank">
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/pieced-team/js-config-webpack-plugin">
  </a>
  <a href="https://www.npmjs.com/package/@pieced/js-config-webpack-plugin" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@pieced/js-config-webpack-plugin" />
  </a>
</p>

> Automatically configuration webpack5 js loader

## Install

```sh
npm i --save-dev @pieced/js-config-webpack-plugin
```

## Webpack Config

```js
const JsConfigWebpackPlugin = require('@pieced/js-config-webpack-plugin');
module.exports = {
  plugins: [new JsConfigWebpackPlugin()],
};
```

## Options

**suffix**

- `type array`
- `default ['js', 'jsx', 'mjs']`

**filename**

- `type string function (pathData, assetInfo) => string`
- [output.filename](https://webpack.js.org/configuration/output/#outputfilename)
- default

```js
webpack.mode === 'development' ? '[name].js' : 'static/js/[contenthash:10].js'
```

**chunkFilename**

- `type string function (pathData, assetInfo) => string`
- [output.chunkFilename](https://webpack.js.org/configuration/output/#outputchunkfilename)
- default

```js
webpack.mode === 'development' ? '[name].js' : 'static/js/[contenthash:10].js'
```

**terser**

- `type object`
- [terser-webpack-plugin options](https://webpack.js.org/plugins/terser-webpack-plugin/#options)
- default

```js
const defaultTerser = {
  extractComments: false,
  terserOptions: {
    output: {
      comments: false,
    },
    compress: {
      drop_debugger: true,
      drop_console: true,
    },
  },
}
```
