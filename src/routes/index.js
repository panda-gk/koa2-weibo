const router = require('koa-router')()

router.get('/', async (ctx, next) => {

  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        value: 1,
        label: 'aaa'
      },
      {
        value: 2,
        label: 'bbb'
      },
      {
        value: 3,
        label: 'ccc'
      },
      {
        value: 4,
        label: 'ddd'
      },
    ]
  })
})

router.get('/string', async (ctx, next) => {
  const {id} = ctx.query
  ctx.body =  {
    code: 1000,
    data: {
      title: 'string',
      id
    }
  }
})

router.get('/json', async (ctx, next) => {

  const session = ctx.session
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum ++
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/profile', async (ctx, next) => {
  console.log(ctx.query)
  const {id} = ctx.query
  ctx.body = {
    title: 'this is a profile page',
    id
  }
})  

module.exports = router
