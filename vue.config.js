const CompressionPlugin = require( 'compression-webpack-plugin' )
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin
// const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const webpack = require( 'webpack' )
const path = require( 'path' )
// const fs = require( 'fs' )
const resolve = dir => path.join( __dirname, dir )
const port = process.env.port || process.env.npm_config_port || 8888
// 打包的版本号
process.env.VUE_APP_Version = '0.0.0'
// 时间戳
// const Timestamp = new Date().getTime()
// API_ROOT,用来打包
if ( process.env.NODE_ENV === 'development' ) {
  process.env.VUE_APP_API_ROOT = '/api'
} else {
  process.env.VUE_APP_API_ROOT = '/api'
}

// 自定义常用的meta处理一些webpack插件是否开启的变量
const META = {
  // 是否开启生产环境压缩js css代码,默认关闭
  productionGzip: false,
  // 是否开启端口可视化文件占比显示 默认端口8082，默认开启
  bundleAnalyzerReport: false,
  // 是否开启webpack 的性能提示，默认关闭
  webpackWarn: false,
  // 是否开启 preload 插件，默认关闭
  preloadOpen: false,
  // 是否开启 prefetch 插件，默认关闭
  prefetchOpen: false
}

module.exports = {
  // 基本路径,部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致,如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: '/',
  // 输出文件目录 build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查 ，
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: false,
  // webpack配置
  chainWebpack: config => {
    // 解决ie9兼容ES6
    // config.entry('main').add('babel-polyfill')
    // url-loader 文件大小低于指定的限制时，可返回 DataURL，即base64
    const imagesRule = config.module.rule( 'images' )
    imagesRule
      .use( 'url-loader' )
      .loader( 'url-loader' )
      .tap( options => Object.assign( options, {
        limit: 6144
      } ) )

    // 添加别名
    config.resolve.alias
      .set( 'vue$', 'vue/dist/vue.esm.js' )
      .set( '@', resolve( 'src' ) )
      .set( '@apis', resolve( 'src/apis' ) )
      .set( '@assets', resolve( 'src/assets' ) )
      .set( '@scss', resolve( 'src/assets/scss' ) )
      .set( '@components', resolve( 'src/components' ) )
      .set( '@middlewares', resolve( 'src/middlewares' ) )
      .set( '@mixins', resolve( 'src/mixins' ) )
      .set( '@plugins', resolve( 'src/plugins' ) )
      .set( '@router', resolve( 'src/router' ) )
      .set( '@store', resolve( 'src/store' ) )
      .set( '@utils', resolve( 'src/utils' ) )
      .set( '@views', resolve( 'src/views' ) )
      .set( '@layouts', resolve( 'src/layouts' ) )

    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: ['//unpkg.com/element-ui/lib/theme-chalk/index.css'],
      js: [
        '//unpkg.com/babel-polyfill/lib/index.js',
        '//unpkg.com/vue/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        '//unpkg.com/vue-router/dist/vue-router.min.js',
        '//unpkg.com/vuex/dist/vuex.min.js',
        '//unpkg.com/axios/dist/axios.min.js',
        '//unpkg.com/element-ui/lib/index.js'
        // '//unpkg.com/vant/lib/index.js',
        // '//unpkg.com/moment/moment.js',
        // '//unpkg.com/echarts/index.js'
      ]
    }

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin( 'html' ).tap( args => {
      // html中添加cdn
      args[0].cdn = cdn

      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    } )
    // 开启js、css压缩
    if ( process.env.NODE_ENV === 'production' ) {
      if ( META.productionGzip ) {
        config.plugin( 'compressionPlugin' )
          .use( new CompressionPlugin( {
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          } ) )
      }
      // 移除 prefetch 插件
      if ( !META.prefetchOpen ) {
        config.plugins.delete( 'prefetch' )
      }
      // 移除 preload 插件
      if ( !META.preloadOpen ) {
        config.plugins.delete( 'preload' )
      }
    }
  },
  configureWebpack: config => {
    config.plugins.push( new webpack.ProvidePlugin( {
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    } ) )
    config.externals = {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      vant: 'vant',
      moment: 'moment',
      echarts: 'echarts'
    }
    // 关闭 webpack 的性能提示
    if ( !META.webpackWarn ) {
      config.performance = {
        hints: false
      }
    }

    if ( META.bundleAnalyzerReport ) {
      config.plugins.push( new BundleAnalyzerPlugin( {
        analyzerHost: '127.0.0.1',
        analyzerPort: 8086
      } ) )
    }
    if ( process.env.NODE_ENV === 'production' ) {
      // 为生产环境修改配置...
      // console.log/info/debug,在生产环境需要去掉这些console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    } else {
      // 为开发环境修改配置...
    }
  },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        // 全局引入
        // sass-loader V7 这里是data
        prependData: `@import "~@/style/_variables.scss";@import "~@/style/common.scss";@import "~@/style/_mixin.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
  parallel: require( 'os' ).cpus().length > 1,
  pwa: {},
  // webpack-dev-server 相关配置

  devServer: {
    open: true, // 配置自动启动浏览器
    port: port, // 端口号
    https: false,
    hotOnly: false // https:{type:Boolean}
    // proxy: { // 配置跨域
    //     '/api': {
    //         target: 'http://imge.kugou.com/',
    //         changeOrigin: true, //改变源
    //         ws: true, //是否代理websockets
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     },
    //     //            '/foo': {
    //     //                target: '<other_url>'
    //     //            }
    // }, // 配置跨域处理,只有一个代理
    // before: app => {

    // }
  },
  // 第三方插件配置
  pluginOptions: {}
}
