<div align="center">
  <img src="logo.png" alt="PWA" height="200" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/@pwa/cli">
    <img src="https://badgen.now.sh/npm/v/@pwa/cli" alt="version" />
  </a>
  <a href="https://travis-ci.org/lukeed/pwa">
    <img src="https://badgen.now.sh/travis/lukeed/pwa" alt="travis" />
  </a>
  <a href="https://npmjs.org/package/@pwa/cli">
    <img src="https://badgen.now.sh/npm/dm/@pwa/cli" alt="downloads" />
  </a>
</div>

---

<p align="center"><strong>WORK IN PROGRESS</strong></p>

---

## Features

* **Framework Agnostic**<br>
  _Build with your preferred framework or with none at all!<br>Official presets for Preact, React, Vue, and Svelte._

* **Plug 'n Play**<br>
  _Don't worry about configuration, unless you want to.<br>Presets and plugins are automatically applied. Just install and go!_

* **Fully Extensible**<br>
  _Includes a plugin system that allows for easy, fine-grain control of your configuration... when needed._

* **Feature Rich**<br>
  _Supports Babel, Bublé, Browserlist, TypeScript, PostCSS, ESLint, Prettier, and Service Workers out of the box!_

* **Instant Prototyping**<br>
  _Quickly scaffold new projects with your preferred view library and toolkit.<br>Kick it off with a perfect Lighthouse score!_

* **Static Site Generator**<br>
  _Export your routes as "pre-rendered" HTML.<br>Great for SEO and works on any static hosting service._


## Installation

PWA is split up into two main components ([`core`](/packages/core) and [`cli`](/packages/cli)) in addition to its list of [presets](#presets) and [plugins](#plugins).

> While most will opt for the CLI, the `core` module handles all configuration and can be used as a standalone module.

Please refer to each package for installation, API, and Usage information.

#### Quick Start

```sh
# Install globally
$ npm install --global @pwa/cli
# OR
$ yarn global add @pwa/cli

# Display CLI's help text
$ pwa --help

# Generate new project
$ pwa init
```

> **Note:** The `global` modifiers are only required for _global_ command-line usage!<br>
Local `devDependency` installation will also work, but then `pwa` usage is limited to the project.


## Concepts

> Please read about [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) if the term is unfamiliar to you.

### Presets

Presets are collections of [plugins](#plugins) that are tailored for a particular framework.

While there may be "official" presets, this **does not** mean that PWA can only support these candidates! The current options are:

* [`@pwa/preset-preact`](/packages/preset-preact)
* [`@pwa/preset-react`](/packages/preset-react)
* [`@pwa/preset-svelte`](/packages/preset-svelte)
* [`@pwa/preset-vue`](/packages/preset-vue)

These packages are auto-loaded during PWA's initialization and are applied _first_, before any [Plugins](#plugins) or [custom configuration](#customizing). This means that you always have the option to override a value or setting shipped within the Preset.

### Plugins

Plugins are (typically) individual features or chunks of configuration that are encapsulated for easy/automatic application within your build process.

While there may be "official" plugins, this **does not** mean that PWA can only support these functionalities! The current plugins include:

* [`@pwa/plugin-critters`](/packages/plugin-critters)
* [`@pwa/plugin-eslint`](/packages/plugin-eslint)
* [`@pwa/plugin-offline`](/packages/plugin-offline)
* [`@pwa/plugin-prettier`](/packages/plugin-prettier)
* [`@pwa/plugin-sw-precache`](/packages/plugin-sw-precache)
* [`@pwa/plugin-sw-workbox`](/packages/plugin-sw-workbox)

These packages are auto-loaded during PWA's initialization and are applied _second_, after any [Presets](#presets) and before [custom configuration](#customizing). This allows Plugins to override settings from Presets.

Plugins may (sometimes) expose a new [key](#config-keys) on the config tree and then reference this value later in composition. This allows the end-user to change the Plugin's settings before running the build.

> Please see [`@pwa/plugin-critters`](https://github.com/lukeed/pwa/blob/master/packages/plugin-critters/index.js) for an example of this practice.

## Commands

> This section applies to [`@pwa/cli`](/packages/cli) specifically.

### Build

> Build your application for production

```
$ pwa build --help

  Description
    Build production assets

  Usage
    $ pwa build [src] [options]

  Options
    --analyze     Launch interactive Analyzer to inspect production bundle(s)
    -o, --dest    Path to output directory  (default build)
    -h, --help    Displays this message
```


### Export

> Export routes' HTML for static hosting

Instead of `--routes`, you may define a `routes` array within [`pwa.config.js`](#customizing) config file.

If no routes are defined in either location, PWA will traverse your `"@pages"`-aliased directory (default: `src/pages/**`) and attempt to infer URL patterns from the file structure.

In the event that no files exist within that directory, PWA will show a warning but still scrape the index (`"/"`) route.

```
$ pwa export --help

  Description
    Export pre-rendered pages

  Usage
    $ pwa export [src] [options]

  Options
    -o, --dest      Path to output directory  (default build)
    -w, --wait      Time (ms) to wait before scraping each route  (default 0)
    -r, --routes    Comma-delimited list of routes to export
    -h, --help      Displays this message
```

> **Important:** Using `export` requires a local version of Chrome installed! See [`chrome-launcher`](https://www.npmjs.com/package/chrome-launcher).


### Watch

> Develop within a live-reload server

Within your [`pwa.config.js`](#customizing)'s `webpack` config, any/all [`devServer`](https://webpack.js.org/configuration/dev-server/) options are passed to Webpack Dev Server.

```
$ pwa watch --help

  Description
    Start development server

  Usage
    $ pwa watch [src] [options]

  Options
    -H, --host     A hostname on which to start the application  (default localhost)
    -p, --port     A port number on which to start the application  (default 8080)
    -q, --quiet    Disable logging to terminal, including errors and warnings
    --https        Run the application over HTTP/2 with HTTPS
    --key          Path to custom SSL certificate key
    --cert         Path to custom SSL certificate
    --cacert       Path to custom CA certificate override
    -h, --help     Displays this message
```

### Build vs Export

Export can be thought of as "Build 2.0" &mdash; it spins up a [Headless Chrome browser](https://www.npmjs.com/package/chrome-launcher) and programmatically scrapes your routes.

This is ideal for SEO, PWA behavior, and all-around performance purposes, as your content will exist on the page _before_ the JavaScript application is downloaded, parsed, boots, and (finally) renders the content.

The generated HTML pages will be placed in your `build` directory. A `/login` route will be exported as `build/login/index.html` &mdash; this makes it compatible with even the "dumbest" of static hosting services!

> **Note:** Running `export` will automatically run `build` before scraping.


## Configuration

### Overview

All configuration within the PWA tree is ***mutable***! [Presets](#presets), [Plugins](#plugins), and your [custom config](#customizing) file write into the same object(s). This is great for composability and extensibility, but _be warned_ that your custom config _may_ break the build if you're not careful.

> :bulb: Official presets & plugins are controlled releases and are ensured to play nicely with one another.

The config object(s) for your project are assembled in this sequence:

1) **Presets:** All non-`webpack` config keys
2) **Plugins:** All non-`webpack` config keys
3) **Custom:** All non-`webpack` config keys
4) **Presets:** The `webpack` config key, if any
5) **Plugins:** The `webpack` config key, if any
6) **Custom:** The `webpack` config key, if any

Because the final config object is passed to Webpack, internally, the `webpack` key always runs last as it composes & moves everything into its relevant loaders, plugins, etc.

> **Important:** When defining a [custom `webpack` key](#webpack) it **must always be a function**!


### Mutations

Every [config key](#config-keys) can be defined or mutated in the same way!

Any non-`Function` key will overwrite the existing value. This allows _strong_ opinions and/or allows a [Plugin]() to define a new config key and reference it later on.

Any [`Function` key](#functions) will receive the existing, _matching_ config-value for direct mutation. This is for fine-grain control over the existing config.

```js
// defaults:
exports.hello = { foo:1, bar:2 };
exports.world = ['How', 'are', 'you?'];

// preset/plugin/custom:
exports.hello = function (config) {
  config.bar = 42;
  config.baz = [7, 8, 9];
}
exports.world = ['I', 'am', 'fine'];
exports.HOWDY = 'PARTNER!';

// result:
exports.hello = {
  foo: 1,
  bar: 42,
  baz: [7, 8, 9]
}
exports.world = ['I', 'am', 'fine'];
exports.HOWDY = 'PARTNER!';
```

### Functions

Any config key that is a function will have the signature of `(config, env, opts)`.

#### config
Type: `Mixed`

This will be the _existing_ value for the current key. It will typically be an Object, but not always.

It will also be `undefined` if/when defining a new config key &mdash; if you know that to be the case, you shouldn't be using a Function~!

#### env
Type: `Object`

Will be the _environmental_ values for this command.<br>
This is passed from [`@pwa/core`](https://github.com/lukeed/pwa/tree/master/packages/core#coresrc-opts)'s options.

The `env.cwd`, `env.src`, `env.dest`, `env.logger`, `env.production` and `env.webpack` keys are always defined.<br>Anything else is contextual information for the current command being run.

#### opts
Type: `Object`

Direct access to configuraton keys, ***except*** `webpack`.

As an example, this can be used within a [Plugin](#plugins) for gaining insight or gaining access to other packages' settings.

The default [config keys](#config-keys) (except `webpack`) will always be present here.


### Config Keys

The following keys are defined by default within every PWA instance. You may [mutate](#mutations) or [compose](#functions) with them accordingly.

#### `babel`
Type: `Object`<br>
Default: [Link](https://github.com/lukeed/pwa/blob/master/packages/core/config/index.js#L1-L21)

Your Babel config object.

#### `browsers`
Type: `Array`<br>
Default: [Link](https://github.com/lukeed/pwa/blob/master/packages/core/config/index.js#L24-L28)

Your target [`browserlist`](https://github.com/browserslist/browserslist) &mdash; which is injected into PostCSS's [`autoprefixer`](https://github.com/postcss/autoprefixer) and Babel's [`env`](https://github.com/babel/babel/tree/master/packages/babel-preset-env) preset.

#### `postcss`
Type: `Array`<br>
Default: [Link](https://github.com/lukeed/pwa/blob/master/packages/core/config/index.js#L32-L34)

Your PostCSS config &mdash; you may also use any config file/method that [`postcss-loader`](https://github.com/postcss/postcss-loader) accepts.

#### `uglify`
Type: `Object`<br>
Default: [Link](https://github.com/lukeed/pwa/blob/master/packages/core/config/index.js#L38-L50)

The options for [UglifyJS Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).

#### `webpack`
Type: `Function`

The main handler for ***all*** of PWA!<br>
When you define a [custom](#customizing) `webpack`, you are not overriding this function. Instead, you are manipulating Webpack's config immediately before PWA executes the build.


### Customizing

[Presets](#presets) and [Plugins](#plugins) are just encapsulated config mutations &mdash; that's it!

Now, if you want to _further_ customize your PWA build, beyond what your installed Presets & Plugins are giving you, then you can create a `pwa.config.js` in your project's root directory.

> **Note:** Your new `pwa.config.js` file should sit alongside your `package.json` :thumbsup:

With this file, you may [mutate](#mutations) or [compose](#functions) _any_ of the [config keys](#config-keys) that either PWA or its [Plugins](#plugins) exposes to you.

Here is an example custom config file:

```js
// pwa.config.js
const OfflinePlugin = require('offline-plugin');

// Override default browserlist
exports.browsers = ['last 2 versions'];

// Mutate "@pwa/plugin-eslint" config
exports.eslint = function (config) {
  config.formatter = require('eslint-friendly-formatter');
};

// Add new PostCSS Plugin
exports.postcss = function (config) {
  config.plugins.push(
    require('postcss-flexbugs-fixes')
  );
};

// Export these pages during "pwa export" command
exports.routes = ['/login', '/register', '/articles/hello-world'];

// Update Webpack config; ENV-dependent
exports.webpack = function (config, env) {
  let { production, webpack } = env;

  if (production) {
    config.plugins.push(
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        MY_API: JSON.stringify('https://api.example.com')
      })
    );
  } else {
    config.devServer.https = true;
    config.plugins.push(
      new webpack.DefinePlugin({
        MY_API: JSON.stringify('http://staging.example.com')
      })
    );
  }
};
```


## Credits

A **huge** thank-you to [Jimmy Moon](https://github.com/ragingwind) for donating the `@pwa` organization on npm! :raised_hands: Aside from being the _perfect_ name, we wouldn't be able to have automatic preset/plugin resolution without a namespace!

**Incredible thanks to the giants whose shoulders this project stands on~!** :heart:

PWA was originally conceived in [2016](https://github.com/lukeed/pwa/commit/8b1c671134a5e8f64081fa2afafebcdd3f392583) but at that time, it wasn't yet possible to build it with the feature set I had in mind. Since then, an amazing amount of work has been done on [Webpack](https://webpack.js.org/) and its ecosystem, which now makes the project goals feasible.

There's no question that PWA takes inspiration from popular CLI applications, like [Preact CLI](https://github.com/developit/preact-cli), [Vue CLI](https://cli.vuejs.org/), and [Create React App](https://github.com/facebook/create-react-app). They _most definitely_ paved the way. I've used, learned from, and refined my wishlist over years while using these tools. Despite their greatness, I still found a need for a universal, framework-agnostic PWA builder that could unify all these great libraries.

## License

MIT © [Luke Edwards](https://lukeed.com)
