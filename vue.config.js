
module.exports = {
    lintOnSave: false, //禁用eslint

    devServer: {
        proxy: {
          '/api': {
            target: 'http://39.98.123.211',
            // 是否吧路径当中的/api去掉 (这里的接口不需要去掉)
            // pathRewrite: { '^/api': '' },
          },
        },
      },
}
