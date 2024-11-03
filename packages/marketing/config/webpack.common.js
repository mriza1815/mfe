
module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/, //mjs ya da js ile bütün dosyaları bable ile process et
                exclude: /node_modules/, // modülleri bu işlemin dışında bırak
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'], // [react jsx kodları için, ES önceki versiyonların hepsini ES& ya çevirir]
                        plugins: ['@babel/plugin-transform-runtime'] // enable some features like, async await syntax or vs
                    }
                }
            }
        ]
    }
}