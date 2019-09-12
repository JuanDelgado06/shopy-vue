module.exports = {
  pluginOptions: {
    quasar: {
      rtlSupport: true,
      treeShake: true
    },
    i18n: {
      locale: 'es', 
      fallbackLocale: 'es', 
      localeDir: 'i18n/locales/messages',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
