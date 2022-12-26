module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        https: true,
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        port: 9001,
    },
}
