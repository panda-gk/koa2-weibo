
const { Blog, User } = require('../db/model')

const createBlog = async(title, content, userId) => {
 const res = await Blog.create({
        title,
        content,
        userId
    })
    // return res.dataValues 返回的是创建的信息
}
const getAllBlogs = async(page, size, userName) => {
        const opts = {
                userName
            }
        const searchParams = {
            limit: +size,
            offset: (page - 1) * 10 || 0,
            order: [ // 倒序查询
                ['id', 'desc']
            ],
            include: [
                {
                    model:User,
                    attributes:['nickName', 'userName'],
                }
            ]
        }
        if (userName) {
            searchParams.include[0].where = opts
        }
    const res = await Blog.findAndCountAll(searchParams)
    return {
        total: res.count, 
        list: res.rows.map(el => el.dataValues),
        page: +page
    }
}
module.exports = {
    createBlog,
    getAllBlogs
}