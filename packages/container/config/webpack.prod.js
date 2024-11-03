

const { merge } = require('webpack-merge')
const HtmlWebpackPlugin =  require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/' //HTML Webpack Plugin html dosyasına script'leri yerleştirmeden önce "filename" tipinde scripttleri oluşturup 
        //publicPath kısmının altına yerleştirir. Bu sayede proje deploy olduğu zaman script tag'leri doğru path'e sahip olur
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                marketing : `marketing@${domain}/marketing/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ]

}

module.exports = merge(commonConfig, prodConfig)