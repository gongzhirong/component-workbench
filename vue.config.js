const Timestamp = new Date().getTime();
module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    //打包目录
    assetsDir: 'static',
    //eslint规范
    lintOnSave: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap:false,
    // webpack-dev-server 相关配置
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true, 
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://xxx.com.cn',
                /* 允许跨域 */
                changeOrigin: true,
                /* 允许websocket */
                ws: true,
                /* 重写路径 */
                pathRewrite: {
                  '^/api': ''
                }
            },
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
        config.output.filename =  `static/js/[name].${Timestamp}.js`;
        config.output.chunkFilename =  `static/js/[name].${Timestamp}.js`;
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        extract: {
            filename: `static/css/[name].${Timestamp}.css`,
            chunkFilename: `static/css/[name].${Timestamp}.css`
        }
    }
}