# @pwa/plugin-offline

> [`PWA`](https://pwa.cafe/) plugin for [Offline Plugin](https://github.com/NekR/offline-plugin)

## Install

```sh
$ npm install --save-dev @pwa/plugin-offline
```

## Usage

The plugin is recognized by and attached to `@pwa/core` automatically.

However, you must manually include Offline's runtime into your bundle!

```js
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    require('offline-plugin/runtime').install();
  }
}
```

> **Note:** For SW beginners, it's strongly recommended you use the above snippet!<br>
However, it's not required to wrap registration in a `NODE_ENV === 'production'` check.

## Config

Configurable via the `offline` key on your `pwa.config.js` file.

***Default Config:***

```js
exports.offline = {
  externals: [],
  appShell: '/index.html',
  excludes: ['**/.*', '**/*.map', '**/*.gz', '**/*.gzip', '**/*.br'],
  ServiceWorker: {
    output: 'sw.js',
    events: true
  }
}
```

***Available Options:***

Please refer to Offline Plugin's [options](https://github.com/NekR/offline-plugin/blob/HEAD/docs/options.md) options.

