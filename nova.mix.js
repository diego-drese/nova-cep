const mix = require('laravel-mix')
const webpack = require('webpack')
const path = require('path')

class NovaExtension {
    name() {
        return 'diego-drese/nova-cep'
    }

    register(name) {
        this.name = name
    }

    webpackPlugins() {
        return new webpack.ProvidePlugin({
            Errors: 'form-backend-validation',
        })
    }

    webpackConfig(webpackConfig) {
        webpackConfig.externals = {
            vue: 'Vue',
        }

        webpackConfig.resolve.alias = {
            ...(webpackConfig.resolve.alias || {}),
            'laravel-nova': path.join(
                __dirname,
                'vendor/laravel/nova/resources/js/mixins/packages.js'
            ),
        }

        webpackConfig.output = {
            uniqueName: this.name,
        }
    }
}

mix.extend('nova', new NovaExtension())
