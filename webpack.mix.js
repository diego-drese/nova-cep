let mix = require('laravel-mix')

mix.setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .vue({ version: 3 })
    .webpackConfig({
        externals: {
            'laravel-nova': 'laravel-nova',
        },
        resolve: {
            extensions: ['.js', '.json', '.vue'],
        },
    })
