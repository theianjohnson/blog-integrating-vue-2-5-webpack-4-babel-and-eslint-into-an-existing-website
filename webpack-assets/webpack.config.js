const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        
        // This key (app-v2) will be our output JS and CSS filenames because (see below) we use the [name] replacement variable
        'app-v2': [
            
            // Babel polyfill needs to be prepended to our JS files
            'babel-polyfill',
            
            // Input files relative to this webpack.config.js
            path.resolve(__dirname) + '/app.js',
            path.resolve(__dirname) + '/app.scss'
        ]
    },
    output: {
        
        // Output JS filename, [name] will be the key `app-v2` from above
        filename: '[name].js',
        
        // Output path relative to this webpack.config.js, so here we're going up one directory and then into assets
        path: path.resolve(__dirname) + '/../assets/'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                },/*{
                    loader: 'eslint-loader' // You can uncomment this if you want compiling to fail if linting fails
                }*/]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            
                            // Optional, but nice feature - If you want to use global SCSS variables in your .vue files, this'll auto prepend a variables file when it parses them. Relative to this webpack.config.js.
                            // data: '@import "_variables.scss";',
                            
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            
            // Output CSS filename, [name] will be the key `app-v2` from above (same as the JS [name])
            filename: '[name].css',
            
            // Output path relative to this webpack.config.js, so here we're going up one directory and then into assets again
            path: path.resolve(__dirname) + '/../assets/'
        })
    ],
    
    // This section (as well as loading UglifyJS) is really just to remove our console.log()'s from our production build. Webpack 4 does minify our JS without it.
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ]
    }
};