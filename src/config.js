const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { findPackageData } = require('@babel/core/lib/config/files/package');
const { findRelativeConfig } = require('@babel/core/lib/config/files/configuration');
const { findRootConfig } = require('@babel/core/lib/config/files/configuration');

// search options file
const searchOptionsFile = (rootDir, mode) => {
  /**
   * Returns true if the value looks like a generator.
   * @param {any} val
   * @returns {val is Generator}
   */
  const isGenerator = (val) => val && typeof val === 'object' && typeof val.next === 'function';
  /**
   * Return the value, unless its an interator, in which case get the last value.
   * Works around differences in return values of @babel/core functions between versions.
   * @template T
   * @param {Generator<T, T> | T} valueOrIterator
   * @returns {T}
   */
  const getResult = (valueOrIterator) => {
    if (!isGenerator(valueOrIterator)) {
      return valueOrIterator;
    }
    let result = valueOrIterator.next();
    while (!result.done) {
      result = valueOrIterator.next();
    }
    return result.value;
  };

  // From https://github.com/babel/babel/blob/52a569056c6008c453bf26219461655c7d0322c4/packages/babel-core/src/config/files/package.js#L15
  const packageData = getResult(findPackageData(rootDir));
  // needed because babels `findRelativeConfig` search just in parent directories
  packageData.directories.push(packageData.filepath);
  // From https://github.com/babel/babel/blob/52a569056c6008c453bf26219461655c7d0322c4/packages/babel-core/src/config/files/configuration.js#L26
  const resolvedRelativeConfig = getResult(findRelativeConfig(packageData, mode));
  const resolvedRootConfig = getResult(findRootConfig(packageData.filepath, mode));

  // babel.config.js
  if (resolvedRootConfig && resolvedRootConfig.filepath) {
    return resolvedRootConfig.filepath;
  }

  // .babelrc.js and .babelrc
  if (resolvedRelativeConfig && resolvedRelativeConfig.config) {
    return resolvedRelativeConfig.config.filepath;
  }
};

module.exports = (options) => ({
  module: {
    rules: [{
      test: new RegExp(`\\.(${options.suffix.join('|')})$`, 'i'),
      loader: 'babel-loader',
      exclude: [path.join(options.context, 'node_modules')],
      options: {
        extends: searchOptionsFile(options.context, options.mode),
        presets: [
          ['@babel/preset-env', { modules: false }],
          '@babel/preset-react',
        ],
        plugins: ['@pieced/babel-plugin-auto-css-modules'],
        cacheDirectory: !options.isDev,
        compact: true,
      },
    }],
  },
  plugins: [
    !options.isDev && options.terser && new TerserWebpackPlugin(options.terser),
  ].filter(Boolean),
});
