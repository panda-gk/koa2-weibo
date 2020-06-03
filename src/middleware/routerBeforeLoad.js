const jwt = require('jsonwebtoken')
const { SESSION_KEY } = require('../conf/constant')

const util = require('util') // 解析token
const verify = util.promisify(jwt.verify) // 解析token

const tokenIntercept = async (ctx, next) => {
  const includeList = ['/api/user/login', '/api/user/register', '/api/test']
  const flag = includeList.some((url) => url == ctx.request.url)
  if (flag) {
      return next()
  }
  const token = ctx.headers['x-token']
  try {
    // redis token
    await verify(token, SESSION_KEY)
    return next()
  } catch (error) {

    ctx.body = {
        code: 20001,
        data: error,
        msg: error.message,
      }
  }
}

module.exports = tokenIntercept
