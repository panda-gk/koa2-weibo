const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const session = require('koa-generic-session') // koa 操作session
// const redisStore = require('koa-redis') // koa操作redis
const { redisConf } = require('./conf/db')
// const routers = require('./routes/index')
const userApiRouter = require('./routes/api/user')
const blogAPiRouter = require('./routes/api/blog')
const errorRouter = require('./routes/view/error')
const indexRouter = require('./routes/users')
const cors = require('koa2-cors');

// jwt 
const koaJwt = require('koa-jwt')
const routerBeforeLoad = require('./middleware/routerBeforeLoad')
const { ErrorModel } = require('./model/ResModel')
const { SESSION_KEY } = require('./conf/constant')
// 跨域

app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-TOKEN'], //设置服务
}))
// error handler 

// 错误路由

let errorConf = {
  redirect: '/error'
}
onerror(app, errorConf)

// middlewares 解析数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//  session 配置
// 加密
// app.keys =[SESSION_KEY],
// app.use(session({
//   key: 'webo.sid', // cookie name 默认 koa.sid
//   prefix: 'webo:sess:', // redis key的 前缀 默认是'koa;sess,
//   cookie: {
//     path:'/', // 全局访问
//     httpOnly: true, // 只能服务端 修改
//     maxAge: 24 * 60 * 60 * 1000 // 过期时间 ms
//   },
//   store: redisStore({
//     all: `${redisConf.host}:${redisConf.port}`
//   })
// }))


// token 过滤规则
// app.use(koaJwt({
//   secret: SESSION_KEY,
// }).unless({
//   path: [
//     /^\/api\/user\/login/,
//     /^\/api\/user\/register/,
//   ]
// }))

// 验证 token 失效
// app.use(routerBeforeLoad)
// app.use(async (ctx, next) => {
//   routerBeforeLoad(ctx,next)
// })
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 容错

// routes
app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogAPiRouter.routes(), blogAPiRouter.allowedMethods())

// app.use(routers.routes(), routers.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(errorRouter.routes(), errorRouter.allowedMethods())

// app.use(async(ctx, next) => {
//   return next().catch(err => {
//     if(err.status == 401) {
//       ctx.status = 401
//       ctx.body = new ErrorModel({code: 401, msg: 'token error 401'})
//     }
//   })
// })


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
