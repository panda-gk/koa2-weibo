
/**
 * @description 数据库链接测试
 */
const seq = require('./seq')

// 引入 模型
require('./model')

// 测试链接
seq.authenticate().then(() => {
    console.log('ok')
}).catch(err => {
    console.log('err')
})
// 执行同步 数据库
// seq.sync({force: true}).then(() => {
//     console.log('sync ok')
//     process.exit()
// })
seq.sync({force: true}).then(() => {
    console.log('sync ok')
    process.exit()
})
