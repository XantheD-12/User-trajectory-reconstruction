// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
// 参考：https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
  // 选项...
  // proxy: {
  //   '/api': {
  //     target: 'http://127.0.0.1:5000',  // 后台接口域名
  //     ws: true,        //如果要代理 websockets，配置这个参数
  //     secure: false,  // 如果是https接口，需要配置这个参数
  //     changeOrigin: true,  //是否跨域
  //   }
  // }
  //assetsDir: 'public', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  //publicPath: '/', //部署应用包时的基本 URL。  
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: 'localhost', //
    port: 8080, //
  },

}