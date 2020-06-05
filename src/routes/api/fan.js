const router = require('koa-router')()

const { getAllUser, attentionOther,getSelfToBeFan, getMyFans } = require('../../controller/fan')

router.prefix('/api/fan')

router.get('/user', async (ctx, next) => {
    ctx.body = await getAllUser(ctx)
})
router.get('/attentionOther', async (ctx, next) => {
    ctx.body = await attentionOther(ctx, ctx.query.userId)
})
router.get('/self/attention', async (ctx, next) => {
    ctx.body = await getSelfToBeFan(ctx)
})
router.get('/myFan', async(ctx ,next) => {
    ctx.body = await getMyFans(ctx)
})

module.exports = router