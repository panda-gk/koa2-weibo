/**
 * @description  json schema 中间件
 */
// const { userValidate } = require('../validator')
const { ErrorModel } = require('../model/ResModel')
/**
 * 
 * @param {function} validFn // 验证的方法
 */
const genValidator = (validFn) => {
    async function validator(ctx, next) {
        const data = ctx.request.body

        const error = validFn(data)

        if (error) {
            ctx.body = new ErrorModel({
                code: 10001,
                msg: '数据格式校验失败'
            })
            return
        }
        await next()
    }
    return validator
}

module.exports = genValidator
