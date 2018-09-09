# @pwa/plugin-buble

> [`PWA`](https://pwa.cafe/) plugin for [`Bublé`](https://buble.surge.sh/guide/#what-is-buble)

## Install

```sh
$ npm install --save-dev @pwa/plugin-buble
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_

> **Important:** This plugin will automatically swap out & disable `babel-loader`!<br>
The use of Bublé is recommended for simpler, vanilla JS applications... and/or for [the wild and crazy](https://blog.chron.com/tubular/files/2014/02/wild-and-crazy-guys1.gif).


## Config

Configurable via the `buble` key on your `pwa.config.js` file.

> **Note:** The [`browsers`](https://github.com/lukeed/pwa#browsers) list of your PWA config will be transformed into a `target` object for Bublé!<br>
However, defining your own `buble.target` object will prevent this transformation.

***Default Config:***

```js
exports.buble = {
  transforms: {
    modules: false
  }
}
```

***Available Options:***

See Bublé's documentation for [Supported Features](https://buble.surge.sh/guide/#supported-features), [JSX](https://buble.surge.sh/guide/#jsx), and [Dangerous Transforms](https://buble.surge.sh/guide/#dangerous-transforms).
