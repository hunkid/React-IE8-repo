const Koa = require('koa')
const koaRouter = require('koa-router')
const path = require('path')
const reactview = require('./plugins/reactview')
const Static = require('./middleware/static')
const serve = require('koa-static')
require('regenerator-runtime/runtime')
const port = 8888

const App = ()=> {
  let app = new Koa()
  const viewpath = './views/'
  const SSRComp = require(viewpath + 'SSRComp')
  const Zoo = require(viewpath + 'Zoo')
  app.config = {
    reactview: {
      viewpath: viewpath,                 // the root directory of view files
      doctype: '<!DOCTYPE html>',
      extname: '.js'                     // view层直接渲染文件名后缀
    }
  }
  // 配置render
  reactview(app)

  // 静态资源托管
  app.use(serve('dist'))

  let router = koaRouter()
  router.get('/', async (ctx, next)=> {
    app.render(ctx, {
      module: SSRComp,
      _locals: {
        "showMsg": "ServerSide Render"
      }
    })
  })

  router.get('/zoo/:animal', async (ctx, next)=> {
    let animal = ctx.params.animal
    app.render(ctx, {
      module: Zoo,
      _locals: {
        isServer: true
      }
    })
  });

  app.use(router.routes())
  return app
}

const createApp = ()=> {
  const app = App()
  app.listen(port, function() {
	  console.log('Listening on port %d', port)
  });
}
createApp()
