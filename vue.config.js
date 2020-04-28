module.exports = {
  publicPath: "",
  outputDir: "./app",
  productionSourceMap: false,
  // simplify and remove /css directory
  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css',
    },
  },
  // simplify and remove /js directory
  configureWebpack: (config) => {
    config.output.filename = '[name].[hash:8].js';
    config.output.chunkFilename = '[name].[hash:8].js';
  },
  chainWebpack: config => {
    // remove the prefetch plugin
    config.plugins.delete('prefetch-index');
  }
}
