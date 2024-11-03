const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|tff|ttf)$/i,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/, //mjs ya da js ile bütün dosyaları bable ile process et
                exclude: /node_modules/, // modülleri bu işlemin dışında bırak
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'], // [ES önceki versiyonların hepsini ES& ya çevirir]
                        plugins: ['@babel/plugin-transform-runtime'] // enable some features like, async await syntax or vs
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
}