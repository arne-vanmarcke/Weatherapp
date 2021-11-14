const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const webpack=require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        index:'./src/index.js',
        },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new HtmlWebpackPlugin({
        title: 'Weatherapp',
        favicon: './src/assets/icon_small.png'
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/sw.js',
        }),
        new WebpackPwaManifest({
            name: 'My web app',
            short_name: 'Wheaterapp',
            description: 'My awesome Progressive Web App!',
            background_color: '#ffffff',
            crossorigin: 'use-credentials',
            publicPath: './',
            theme_color:'#ffffff',
            icons: [
              {
                src: path.resolve('./src/assets/logo-512-of.png'),
                size: '512x512'
              },
              {
                src: path.resolve('./src/assets/logo-1024.png'),
                size: '1024x1024'
              },
              {
                src: path.resolve('./src/assets/logo-1024.png'),
                size: '1024x1024',
                purpose: 'maskable'
              }
            ]
        })      
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'webfonts',
                    publicPath: '../webfonts',
                },
            },
        },
        ],
    },
};