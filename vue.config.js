const merge = require("webpack-merge");
const TsImportPlugin = require("ts-import-plugin");
const path = require("path");
const ThemeColorReplacer = require("webpack-theme-color-replacer");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 4300
    // open: true
  },

  chainWebpack: config => {
    config.plugin("define").tap(args => {
      args[0] = {
        "process.env":
          process.env.ENV === "pro"
            ? require("./config/prod.env")
            : require("./config/dev.env")
      };

      return args;
    });

    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              TsImportPlugin({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });

    config.module.rules.delete("svg");
    config.module
      .rule("svg")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .end()
      .use("svgo-loader")
      .loader("svgo-loader");
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#fc2834"
        }
      }
    }
  },

  pluginOptions: {
    // https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        resolve("src/styles/var.less"),
        resolve("src/styles/mixins.less")
      ]
    }
  },

  configureWebpack: () => {
    const plugins = [
      new ThemeColorReplacer({
        matchColors: ["#fc2834"],
        fileName: "css/theme-colors.[contenthash:8].css",
        injectCss: true
      })
    ];

    return { plugins };
  }
};
