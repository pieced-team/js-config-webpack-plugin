const mergeFn = require('lodash/merge');
const config = require('./config');

module.exports = class JsConfigWebpackPlugin {
  constructor(options) {
    this.options = options;

    this.getOptions = this.getOptions.bind(this);
  }

  apply(compiler) {
    const { constructor, getOptions } = this;

    const cfg = config(getOptions(compiler));
    // Merge config
    compiler.hooks.afterEnvironment.tap(constructor.name, () => compiler.options.module.rules.push(...cfg.module.rules));
    cfg.plugins.forEach((plugin) => plugin.apply(compiler));
  }

  getOptions(compiler) {
    const { mode } = compiler.options;
    const isDev = mode === 'development';
    const defaultOpt = {
      suffix: ['js', 'jsx', 'mjs'],
      terser: {
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      },
    };
    return mergeFn({}, defaultOpt, this.options, { isDev, context: compiler.context || process.cwd(), mode });
  }
};
