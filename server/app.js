const Koa = require('koa')
const koaRouter = require('koa-router')
const path = require('path')
var test = require('./test')
require('regenerator-runtime/runtime')
const port = 8888

const App = ()=> {
  let app = new Koa()
  let router = koaRouter()
  router.get('/', async (ctx, next)=> {
    ctx.response.body = test()
  })
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
