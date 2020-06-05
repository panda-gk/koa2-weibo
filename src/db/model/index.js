const User = require('./User')
const Blog = require('./Blog')
const Fan = require('./Fan')
// 创建外健
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
// 一对多
// User.hasMany(Blog, {
//     foreignKey: 'userId'
// })
// User 通过 fan fanId 命中 userId  
User.hasMany(Fan,{
    foreignKey: 'userId',
})
//fan表查询 userId 命中 fanId => user
Fan.belongsTo(User, {
    foreignKey: 'fanId'
})
module.exports = {
    User,
    Blog,
    Fan
}