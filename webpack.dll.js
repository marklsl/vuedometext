const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        jquery: ['jquery'],
        cesium: ['cesium'],
    },

    output: {
        filename: '[name].dll.js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_library', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    plugins: [
        new webpack.DllPlugin({
            path: resolve(__dirname, 'manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]_library',
        }),
    ],
    mode: 'production',
};
