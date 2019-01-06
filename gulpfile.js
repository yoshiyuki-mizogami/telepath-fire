const webpack = require('webpack')
function build(dev = false){
  const webpackConfig = require('./webpack.config')
  webpackConfig.mode = dev ? 'development' : 'production'
  const compiled = webpack(webpackConfig)
  return new Promise(res=>{
    if(dev){
      compiled.watch({}, (er, stat)=>{
        console.log(stat.toString({colors:true}))
        res()
      })
      return
    }
    compiled.run((er, stat)=>{
      console.log(stat.toString({colors:true}))
      res()
    })
  })
}
exports.dev = ()=>{
  let compiled = false
  return new Promise(res=>{
    build(true).then(()=>{
      if(compiled){
        return
      }
      compiled = true
      res()
    })
  })
}

exports.build = build