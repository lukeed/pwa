# @pwa/plugin-prettier

> [`PWA`](https://pwa.cafe/) plugin for [Prettier](https://prettier.io/)

## Install

```sh
$ npm install --save-dev @pwa/plugin-prettier
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_

## Config

Configurable via the `prettier` key on your `pwa.config.js` file.

By default, Prettier's [configuration files](https://prettier.io/docs/en/configuration.html) are supported and applied automatically:

* `.prettierrc`
* `prettier.config.js`
* `package.json`'s `"prettier"` key
* `.prettierignore`

> **Note:** Prettier options passed to `pwa.config.js` directly will override config files' values.

***Default Config:***

```js
exports.prettier = {
  parser: 'babylon'
}
```

***Available Options:***

See Prettier's [Options](https://prettier.io/docs/en/options.html)

