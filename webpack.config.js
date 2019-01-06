const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
  target:'web',
  mode:'production',
  node:{
    __dirname:true,
    __filename:true
  },
  entry:{
    main:'./src/ts/main.ts'
  },
  output:{
    path:path.resolve(__dirname, 'public/bundle/'),
    filename:'[name].js'
  },
  resolve:{
    extensions:['.ts','.vue', '.js']
  },
  module:{
    rules:[
      {
        test:/\/.ts$/,
        loader:'ts-loader',
        options:{
          appendTsSuffixTo:[/\.vue$/]
        }
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test:/\.stylus$/,
        use:[
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin({
      filename:'[name].css'
    })
  ],
  devtool:'inline-source-map'
}
