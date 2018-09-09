# @pwa/plugin-brotli

> [`PWA`](https://pwa.cafe/) plugin for preparing compressed assets with [`brotli`](https://github.com/google/brotli)

## Install

```sh
$ npm install --save-dev @pwa/plugin-brotli
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_


## Config

Configurable via the `brotli` key on your `pwa.config.js` file.

***Default Config:***

```js
exports.brotli = {
  cache: true,
  threshold: 0,
  minRatio: 0.8,
  compressionOptions: {
    quality: 11,
    size_hint: 0,
    lgblock: 0,
    lgwin: 22,
    mode: 0
  }
}
```

***Available Options:***

See [Options](https://github.com/webpack-contrib/compression-webpack-plugin#options) for `compression-webpack-plugin`.

Also see [`iltorb`'s Encoding Params](https://github.com/MayhemYDG/iltorb#brotliencodeparams) for the `compressionOptions` object.

> :bulb: Explanations for the `brotli` parameters are available [here](https://github.com/google/brotli/blob/v1.0.4/c/include/brotli/encode.h#L133-L205).

