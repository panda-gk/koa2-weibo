const router = require('koa-router')()
const { add, getBlogs } = require('../../controller/blog')
router.prefix('/api/blog')

router.post('/add', async (ctx, next) => {
    const {title, content} = ctx.request.body
    ctx.body = await add(ctx, title, content)
})
router.post('/list', async(ctx, next) => {
    const {page,size, userName}= ctx.request.body
    ctx.body = await getBlogs(page, size, userName)
})
module.exports = router
