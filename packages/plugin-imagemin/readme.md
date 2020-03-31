# @pwa/plugin-imagemin

> [`PWA`](https://pwa.cafe/) plugin for to compress image assets

## Install

```sh
$ npm install --save-dev @pwa/plugin-imagemin
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_

> **Note:** Disabled during development (aka, `pwa watch`)

## Config

Configurable via the `imagemin` key on your `pwa.config.js` file.

***Default Config:***

> **Note:** In addition to the below, inherits `imagemin-webpack-plugin` defaults.

```js
exports.imagemin = {
  test: /\.(svg|jpe?g|png|gif)$/i
}
```

***Available Options:***

See [`imagemin-webpack-plugin`](https://github.com/Klathmon/imagemin-webpack-plugin#api) for documentation.
