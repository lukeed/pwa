# @pwa/plugin-eslint

> [`PWA`](https://pwa.cafe/) plugin for [ESLint](https://eslint.org/)

## Install

```sh
$ npm install --save-dev @pwa/plugin-eslint
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_

## Config

Configurable via the `eslint` key on your `pwa.config.js` file.

You may also define or use existing `.eslintrc.*` files in your project. You may also provide a custom `configFile` path.

***Default Config:***

```js
exports.eslint = {
  cache: true,
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

***Available Options:***

See [Options](https://github.com/webpack-contrib/eslint-loader#options) for `eslint-loader` and [ESLint's Options](https://eslint.org/docs/developer-guide/nodejs-api#cliengine) too.

