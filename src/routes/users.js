const router = require('koa-router')()

router.prefix('/api/test')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'koa2项目实践',
        isMe: false
    })
})
router.get('/list', async (ctx, next) => {
    ctx.body = {
        title: 'list页面'
    }
})
/**
 * @description 第一种get传参
 */
router.get('/detail/:id', async (ctx, next) => {
    const {id } = ctx.params
    ctx.body = {
        title: '详情页面',
        id
    }
})
/**
 * @description 第二种get传参
 */
router.get('/detail2', async (ctx, next) => {
    const {id} = ctx.query
    ctx.body = {
        title: '详情页面2',
        id
    }
})
router.post('/login', async (ctx, next) => {
    const {userName, password} = ctx.request.body
    ctx.body = {
        title: '登陆',
        userName,
        password
    }
})
module.exports = router