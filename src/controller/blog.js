
const { createBlog, getAllBlogs } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const _redis = require('../cache/_redis')
const add = async (ctx,title, content) => {
    // services
   try {
    const token =  ctx.headers['x-token']
    const userInfo = await _redis.get(token)
    await createBlog(title, content, userInfo.id)
    return new SuccessModel()  
   } catch (error) {
    return new ErrorModel({msg: '创建失败'})
       
   }
}

const getBlogs = async(page, size, userName) => {
    const res = await getAllBlogs(page, size, userName)
    // console.log('getBlogs=>', res)
    return new SuccessModel(res)
}

module.exports = {
    add,
    getBlogs
}