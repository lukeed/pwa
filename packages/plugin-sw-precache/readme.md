# @pwa/plugin-sw-precache

> [`PWA`](https://pwa.cafe/) plugin for [SW Precache](https://github.com/GoogleChromeLabs/sw-precache)

## Install

```sh
$ npm install --save-dev @pwa/plugin-sw-precache
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_

## Config

Configurable via the `precache` key on your `pwa.config.js` file.

***Default Config:***

```js
exports.precache = {
  minify: true,
  filename: 'sw.js',
  // stripPrefix: env.src
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [
    /\.git/,
    /\.map$/,
    /.DS_Store/,
    /manifest\.json$/
  ]
}
```

***Available Options:***

See [Options](https://github.com/goldhand/sw-precache-webpack-plugin#configuration) for `sw-precache-webpack-plugin`.

