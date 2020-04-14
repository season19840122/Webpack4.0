module.exports = {
  HTMLDirs: [{
      js: 'order', // js name & 文件目录名
      filename: '订单管理', // file name
      title: '订单管理' // page title
    },
    {
      js: 'manage',
      filename: '提现管理',
      title: '提现管理'
    },
    {
      js: 'modify',
      filename: '提现账户',
      title: '提现账户'
    },
    {
      js: 'detail',
      filename: '提现明细',
      title: '提现明细'
    },
    {
      js: 'cash',
      filename: '资金管理',
      title: '资金管理'
    }
  ],
  // publicPath: './', // 本地相对路径
  publicPath: '//static.51ux.com/show/', // 正式静态资源域名
  devServerOutputPath: '../dist',
  cssOutputPath: 'res/seller/css', // 生成的目录要是相对路径
  jsOutputPath: 'res/seller/js',
  imgOutputPath: 'res/seller/img',
  // cssOutputPath: 'css', // 没修改之前的配置
  // jsOutputPath: 'js',
  // imgOutputPath: 'img',
  fontOutputPath: 'font',
};

// url: http://localhost:8080/订单管理.html
