const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path')
const srcDir = resolve(__dirname, 'src')

module.exports = {
    entry: `${srcDir}/index.js`,
    output: {
        filename:'dist/bundle.js'
    }
    
}