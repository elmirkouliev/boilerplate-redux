const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const fileLoaderName = 'fonts/[name].[ext]';
const hashDate = Date.now();
const appDirectory = './app';
const platformDirectory = `${appDirectory}/platform/views/`

// Generates view object for us
const views = () => {
    const viewsToReturn = {};

    const viewFiles = [].concat(
        genViewsFromDir(platformDirectory)
    );

    viewFiles.forEach((view) => {
        if (['app.js', '.DS_Store'].indexOf(view.file) !== -1) return;

        viewsToReturn[view.file.replace('.js', '')] = ['babel-polyfill', view.dir + view.file];
    });

    return viewsToReturn;
};

// Generates object mapping { dir: directory, file: file (from 'fs') }
const genViewsFromDir = (dir) => {
    return fs.readdirSync(dir).map((file) => (
        { dir, file }
    ));
}

// Generates plugins for webpack
const plugins = (env) => {
    // Base plugins
    let arr = [];

    if (env === 'dev') {
        arr.push(
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify('development') },
            })
        );
    }

    if (env === 'production') {
        arr.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                sourceMap: false,
            })
        );
        arr.push(new webpack.optimize.DedupePlugin());
        arr.push(
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify('production') },
            })
        );
    }

    return arr;
};

// Define output obj. for webpack
const output = (env) => {
    const jsPath = `js/[name].js`;

    if(env === 'production') {
        return {
            path: path.resolve(`public/build/${hashDate}/`),
            filename: jsPath,
            chunkFilename: jsPath,
            publicPath: `/build/${hashDate}/`
        }
    } else {
        return {
            path: path.resolve(`public/build/`),
            filename: jsPath,
            chunkFilename: jsPath,
            publicPath: '/build/'
        }
    }
};

//Pretty self explanatory
const rules = (env) => {
    return [
        // Babel
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        }
    ];
};


/**
 * Exports webpack JSON config
 * @param  {String} `env` The environment we're in
 * @return {Object} Webpack confing
 */
module.exports = (env = 'dev') => ({
    entry: views(env),
    output: output(env),
    plugins: plugins(env),
    watch: env === 'dev',
    devtool: env === 'dev' ? 'eval-source-map' : null,
    module: { 
        rules: rules(env)
     }
});
