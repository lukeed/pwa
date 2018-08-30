# @pwa/core

> PWA's core configuration builder. &mdash; [_View Docs_](https://pwa.cafe)

```sh
$ npm install --save-dev @pwa/core
```

## API

### core(src, opts)
> Returns: `WebpackCompiler`

Returns an instance of Webpack.

Attaches a `PWA_CONFIG` key on the `WebpackCompiler` directly, containing the parsed `pwa.config.js` file, if any.

Will also mutate `opts` will additional keys:

* `src` – the resolved `src` value<br>
  _Equivalent to `WebpackCompiler.options.context` value._

* `webpack` - the `require('webpack')` instance in use<br>
  _For reuse / convenience elsewhere; eg, Plugins._

#### src
Type: `String`<br>
Default: `'src'`

The name of your "source" directory within the `opts.cwd`. This will be set as the [`context`](https://webpack.js.org/configuration/entry-context/#context) for Webpack.

> **Important:** Reverts to the `opts.cwd` if the directory could not be found.

#### opts.cwd
Type: `String`<br>
Default: `'.'`

The current working directory.

#### opts.dest
Type: `String`<br>
Default: `'build'`

The name of the [`output`](https://webpack.js.org/configuration/output/#output-path) directory.

#### opts.analyze
Type: `Boolean`<br>
Default: `false`

When this and `opts.production` are both `true`, attaches and starts [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) for bundle inspection.

#### opts.production
Type: `Boolean`<br>
Default: `false`

If building configuration for production.

#### opts.template
Type: `String`

The name or path to a custom template for [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin).

If nothing is provided, then PWA will look for a `index.{html,hbs,ejs}` file within your `src` directory.

If an `index.(html|hbs|ejs)` couldn't be found, then the [internal template](https://github.com/lukeed/pwa/blob/master/packages/core/webpack/template.ejs) will be used.


## License

MIT © [Luke Edwards](https://lukeed.com)

