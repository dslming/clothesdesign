const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  // outputDir: "custom.niudingwang.net",
  // publicPath: 'https://niuding.oss-cn-beijing.aliyuncs.com/webview/',
  publicPath: "./",

  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src/'))
  },
  devServer: {
    host: '0.0.0.0',
    open: true,
    port: 9999,
    proxy: {
      '/': {
        target: 'https://diy.tontossport.com/',
        // target: 'https://diy.niudingwang.net/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/global.scss";',
      }
    }
  }
}
