# @pwa/plugin-sw-precache

> [`PWA`](https://pwa.cafe/) plugin for [SW Precache](https://github.com/GoogleChromeLabs/sw-precache)

## Install

```sh
$ npm install --save-dev @pwa/plugin-sw-precache
```

## Usage

The plugin is recognized by and attached to `@pwa/core` automatically; however, you must manually include the generated `sw.js` file into your bundle!

```js
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}
```

> **Note:** For SW beginners, it's strongly recommended you use the above snippet!<br>
However, it's not required to wrap registration in a `NODE_ENV === 'production'` check.


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

