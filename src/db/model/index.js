const User = require('./User')
const Blog = require('./Blog')

// 创建外健
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
// 一对多
User.hasMany(Blog, {
    foreignKey: 'userId'
})
module.exports = {
    User,
    Blog,
}