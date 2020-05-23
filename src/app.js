const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session') // koa 操作session
const redisStore = require('koa-redis') // koa操作redis
const { redisConf } = require('./conf/db')
const index = require('./routes/index')
const users = require('./routes/users')
const errorRouter = require('./routes/view/error')
const cors = require('koa2-cors');
// 跨域
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   await next();
//  });
//  app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200; 
//   } else {
//     await next();
//   }
// });
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

// middlewares
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
app.keys =['gbbGyr_123456'],
app.use(session({
  key: 'webo.sid', // cookie name 默认 koa.sid
  prefix: 'webo:sess:', // redis key的 前缀 默认是'koa;sess,
  cookie: {
    path:'/', // 全局访问
    httpOnly: true, // 只能服务端 修改
    maxAge: 24 * 60 * 60 * 1000 // 过期时间 ms
  },
  store: redisStore({
    all: `${redisConf.host}:${redisConf.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorRouter.routes(), errorRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
