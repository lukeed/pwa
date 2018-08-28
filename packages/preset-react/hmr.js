module.exports = function (App, module) {
  if (process.env.NODE_ENV !== 'production') {
    const { hot } = require('react-hot-loader');
    return hot(module)(App);
  }
  return App
}
