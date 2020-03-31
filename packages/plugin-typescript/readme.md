# @pwa/plugin-typescript

> [`PWA`](https://pwa.cafe/) plugin for [TypeScript](https://typescriptlang.org) **syntax** support!

Installing this plugin allows your PWA toolchian to consume & understand TypeScript. This is done by:

* attaching [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript)
* altering webpack so that it recognizes the `.ts` and `.tsx` extensions
* altering `@pwa/plugin-prettier` and `@pwa/plugin-eslint` traverse TypeScript (if installed)
* running TypeScript type checks in a separate process

> **Important:** Your PWA application is still compiled by Babel!<br>This allows you to continue leveraging the existing Babel ecosystem.<br>This plugin enables you to **write** in TypeScript and yield its type-checking.

## Install

```sh
$ npm install --save-dev @pwa/plugin-typescript typescript
```

## Usage

_None – recognized by and attached to `@pwa/core` automatically!_

## Config

Configurable via the `typescript` key on your `pwa.config.js` file.

Your configuration is passsed to [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript) directly!


> **Note:** Prettier options passed to `pwa.config.js` directly will override config files' values.

***Default Config:***

```js
exports.typescript = {
  allExtensions: true,
  isTSX: true,
}
```

***Available Options:***

See the [TypeScript Options](https://babeljs.io/docs/en/babel-preset-typescript#options) for the Babel preset.
