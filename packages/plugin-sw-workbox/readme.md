# @pwa/plugin-sw-workbox

> [`PWA`](https://pwa.cafe/) plugin for [Workbox SW](https://developers.google.com/web/tools/workbox/modules/workbox-sw)

PWA runs Workbox in the `GenerateSW` mode by default.

If you'd like to use `InjectManifest` mode for more control, you must set either `advanced` or `injectManifest` to true.

> **Important:** With `InjectManiest`, you must also create a `service-worker.js` template file in your `src` directory.

***Further Reading***
* [Which Workbox mode should I use?](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use)

## Install

```sh
$ npm install --save-dev @pwa/plugin-sw-workbox
```

## Usage

The plugin is recognized by and attached to `@pwa/core` automatically.

However, you must manually include the generated `sw.js` file into your bundle!

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

Configurable via the `workbox` key on your `pwa.config.js` file.

***Default Config:***

```js
exports.workbox = {
  advanced: false, // alias
  injectManifest: false, // alias
  swSrc: 'service-worker.js', // template; mode: InjectManifest
  navigateFallbackWhitelist: [/^(?!\/__).*/], // mode: GenerateSW
  navigateFallback: 'index.html', // mode: GenerateSW
  swDest: 'sw.js',
  exclude: [
    /\.git/,
    /\.map$/,
    /\.DS_Store/,
    /^manifest.*\.js(?:on)?$/,
    /\.gz(ip)?$/,
    /\.br$/
  ]
}
```

***Available Options:***

If either `injectManifest` or `advanced` is set, please see [InjectManifest](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config) options.

Otherwise, please refer to the [GenerateSW](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config) options.

