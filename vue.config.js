module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        server: 'https',
        host: '0.0.0.0',
        allowedHosts: 'all',
        hot: true,
        port: 9001,
        client: {
            webSocketURL: 'wss://' + process.env.VUE_HOST + ':9001/ws',
        },
    },
}
