const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const isPro = process.env.NODE_ENV === 'production';
module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/icenter/': {
                target: 'http://36.112.11.166:8310',
                changeOrigin: true,
                pathRewrite: {
                    '^/icenter': '/',
                },
            },
        },
    },
    publicPath: isPro ? './' : '/',
    configureWebpack: config => {
        config.resolve.alias = {
            C: resolve(__dirname, 'src/components'),
            S: resolve(__dirname, 'src/store'),
            A: resolve(__dirname, 'src/assets'),
            U: resolve(__dirname, 'src/util'),
            cesium: resolve(__dirname, cesiumSource),
        };
        if (isPro) {
            config.plugins.push(
                new webpack.DllReferencePlugin({
                    context: resolve(__dirname, '..'),
                    manifest: require('./manifest.json'),
                })
            );
        }

        config.amd = {
            // cesium 2
            toUrlUndefined: true,
        };
        // cesium 3 不加这个配置会报require引入警告
        config.module.unknownContextCritical = false;
        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: isPro ? './public/index_pro.html' : './public/index_dev.html',
            }),

            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify(''),
                /** icenter服务 */
                ICENTER_URL: JSON.stringify('/icenter/'),
                ICENTER_username: JSON.stringify('admin'),
                ICENTER_password: JSON.stringify('icenter'),
                CESIUM_NAME: JSON.stringify('Global_Image_JPEG_4326-JPEG-4326'),
                TERRAIN_URL: JSON.stringify('/tilecache/service/terrain/Global_DEM-TERRAIN-4326'),
                PLACE_NAMES: JSON.stringify('Global_ImageLabel-PNG-4326'),
            }),
            // 对build生效，拷贝到dist目录下。如：dist/Assets
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: require('path').join(cesiumSource, cesiumWorkers),
                        to: 'Workers',
                    },
                ],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: require('path').join(cesiumSource, 'Assets'),
                        to: 'Assets',
                    },
                ],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: require('path').join(cesiumSource, 'Widgets'),
                        to: 'Widgets',
                    },
                ],
            }),
            new webpack.ProvidePlugin({
                Cesium: ['cesium/Cesium'], // Cesium对象实例可在每个js中使用而无须import
            })
        );
        config.optimization = {
            minimize: isPro,
        };
    },
};
