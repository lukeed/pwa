# @pwa/plugin-zopfli

> [`PWA`](https://pwa.cafe/) plugin for preparing compressed assets with [`zopfli`](https://github.com/google/zopfli)

## Install

```sh
$ npm install --save-dev @pwa/plugin-zopfli
```

> **Important:** Requires Node 8.x or above to work!

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_


## Config

Configurable via the `zopfli` key on your `pwa.config.js` file.

***Default Config:***

```js
exports.zopfli = {
  cache: true,
  threshold: 0,
  minRatio: 0.8,
  compressionOptions: {
    numiterations: 15
  }
}
```

***Available Options:***

See [Options](https://github.com/webpack-contrib/compression-webpack-plugin#options) for `compression-webpack-plugin`.

Also see [`universal-zopfli-js`'s Options](https://github.com/gfx/universal-zopfli-js#options) for the `compressionOptions` object.

