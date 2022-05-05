module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        https: true,
        host: 'localhost',
        hot: true,
        disableHostCheck: true,
        port: 9001,
    },
}
