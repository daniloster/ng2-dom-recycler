var webpack = require('webpack'),
    path = require('path'),
    package = require('./package.json'),

    isTest = process.env.NODE_ENV === 'test',
    isProd = process.env.NODE_ENV === 'production',
    isDev = process.env.NODE_ENV === 'dev';

function toCamelCase(text) {
    return text.split('-')
        .map((part, idx) =>
            idx === 0
                ? part
                : [part.charAt(0).toUpperCase(), part.substring(1).toLowerCase()].join('')
        )
        .join('');
}

// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './src/polyfills.browser.ts',
        'vendor': './src/vendor.browser.ts',
        'main': './DEV/main.browser.ts',
    },

    output: {
        path: './dist',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'inline-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd',
        library: toCamelCase(package.name)
    },

    resolve: {
        root: [path.join(__dirname, 'src'), path.join(__dirname, 'DEV')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

if (isProd) {
    webpackConfig.entry = {
        [package.name]: './index'
    }
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
