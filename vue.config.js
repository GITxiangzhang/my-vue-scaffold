module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 8090,
        proxy: {
            '/api': {
                target: 'http://10.119.169.30:8627', //代理到后端服务器地址
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
};
