# @pwa/plugin-gzip

> [`PWA`](https://pwa.cafe/) plugin for preparing compressed assets with `gzip`

## Install

```sh
$ npm install --save-dev @pwa/plugin-gzip
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_


## Config

Configurable via the `gzip` key on your `pwa.config.js` file.

***Default Config:***

```js
exports.gzip = {
  cache: true,
  threshold: 0,
  minRatio: 0.8,
  compressionOptions: {
    level: 9
  }
}
```

***Available Options:***

See [Options](https://github.com/webpack-contrib/compression-webpack-plugin#options) for `compression-webpack-plugin`.

Also see [`zlib` Options](https://nodejs.org/api/zlib.html#zlib_class_options) for the `compressionOptions` object.

