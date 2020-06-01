const router = require('koa-router')()

const genValidator = require('../../middleware/validator')
const {userValidate} = require('../../validator')
// 引用控制器
const { 
  isExist, 
  register, 
  login, 
  info, 
  getUserList,
  delUser,
  editUser,
  quickCreate
} = require('../../controller/user')
// 引用数据库
router.prefix('/api/user')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// 注册接口
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  // 用户名 密码 性别
  ctx.body = await register(ctx.request.body)

  
})

// 检测用户是否存在
router.post('/isExist', async(ctx, next)=>{
  if (uid) {
    next()
  }else {
    ctx.body = {
      code: 10001,
      msg: ''
    }
  }
}, async (ctx, next) => {
  // 用户名 密码 性别
  const { userName } = ctx.request.body

  // 1 controller 处理业务逻辑
  // 2 services 获取数据
  // 3 统一返回数据格式
    ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // controller 处理业务
  // serveice 获取数据
  // 统一返返回数据格式
  ctx.body = await login({ctx, userName, password})

})
// 获取用户信息
router.get('/info', async (ctx, next) => {
  ctx.body = await info(ctx)
})

// 获取用户列表
router.get('/list', async(ctx, next) => {
  const {page, size, userName} = ctx.query
  // controller
  // service
  ctx.body = await getUserList(page, size, userName)
})
/**
 * @description 删除用户
 */
router.get('/del', async(ctx, next) => {
  const {id} = ctx.query
  ctx.body = await delUser(id)
})
// 编辑
router.post('/edit', async(ctx, next) => {
  ctx.body = await editUser(ctx.request.body)
})
// 批量创建啊
router.get('/qkCreate', async(ctx) => {
  ctx.body = await quickCreate()
})

module.exports = router
