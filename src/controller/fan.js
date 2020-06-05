const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getAllUserWidthOutSelf, toBeOtherFans, selfToBeFan, getFan, myFans} = require('../services/fan')
const _redis  = require('../cache/_redis')
// 第二种方式把生成的token当作key
const getAllUser = async (ctx) => {
    const token = ctx.headers['x-token']
    const userInfo = await _redis.get(token)
    const res = await getAllUserWidthOutSelf(userInfo.id)
    return new SuccessModel(res)
}
// 关注别人 成为别人的粉丝
const attentionOther = async (ctx, userId) => {
    const token = ctx.headers['x-token']
    const userInfo = await _redis.get(token)
    try {
        const res = await toBeOtherFans(userId, userInfo.id)
        return new SuccessModel()
    } catch (error) {
        console.log(error)
        return new ErrorModel({code: 10000, msg: '创建失败'})
    }
}
// 我关注的
const getSelfToBeFan = async (ctx) => {
    const token = ctx.headers['x-token']
    const userInfo = await _redis.get(token)
   const res =  await getFan(userInfo.id)
   return new SuccessModel(res)
}

const getMyFans = async (ctx) => {
    const token = ctx.headers['x-token']
    const userInfo = await _redis.get(token)
   const res =  await myFans(userInfo.id)
   return new SuccessModel(res)
}
module.exports = {
    getAllUser,
    attentionOther,
    getSelfToBeFan,
    getMyFans
}