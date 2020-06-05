/**
 * @description user 业务逻辑处理
 */
const { 
    getUserInfo, 
    createUser, 
    findAllUser,
    deleteUser,
    updateUser,
    qkCreateUser,
    getUserInfoWidthId
  } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {SESSION_KEY} = require('../conf/constant')
const jwt = require('jsonwebtoken') // 生成token

const util = require('util') // 解析token
const verify = util.promisify(jwt.verify) // 解析token
const _redis  = require('../cache/_redis')
// 加密
const encrypt =  require('../utils/encrypt')

/**
 * 检测用户是否存在
 * @param {string} userName 
 */
 const isExist = async (userName) => {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户存在 不能注册
        // return new ErrorModel({
        //     code: 10003,
        //     msg: '用户已存在'
        // })
        return new SuccessModel({isExist: 1})
    } else {
        // 用户不存在 可以注册
        return new SuccessModel({isExist: 0})
    }
 }
/**
 * @description 注册
 * @param {object} param0 
 */
 const register = async ({userName, password, nickName, gender}) => {
     if (!userName || !password || !gender) {
         return new ErrorModel({code: 10000, msg: '参数缺失'})
     }
     const userInfo = await getUserInfo(userName)
     if (userInfo) {
         return new ErrorModel({code: 10000, msg: '用户名已经注册'})
     } 

     try {
        await createUser({
                userName,
                password: encrypt(password), 
                nickName: nickName ? nickName :userName,
                gender
            })
        return new SuccessModel({})
     } catch (error) {
         console.log(error)
         return new ErrorModel({code:10000, msg: '注册失败'})
     }
 }
/**
 * @description 登陆
 * @param {object} param0 
 */
 const login = async ({ctx, userName, password}) => {
     // 检测参数
     if (!userName || !password) {
        return new ErrorModel({code: 10000, msg: '参数缺失'})
    }
    // services 获取数据  
    const userInfo = await getUserInfo(userName, password = encrypt(password))
    if (userInfo) {
        const token = jwt.sign(userInfo, SESSION_KEY, { expiresIn: '2h' })
        _redis.set(`${token}`, userInfo)
        return new SuccessModel(token)
    } else {
        return new ErrorModel({
            code: 10000,
            msg: '未找到用户'
        })
    }

 }
 /***
  * @description 获取用户信息
  */
 const info = async (ctx) => {
     // 第一种方式 解析token
    const token = ctx.headers['x-token']
    // 第二种方式把生成的token当作key
    let userInfo
    const userRedis = await _redis.get(token)

    if (userRedis) {
        return new SuccessModel(userRedis)
    }
    //  console.log('userInfo => ', userInfo)
     userInfo = await verify(token, SESSION_KEY)
     return new SuccessModel(userInfo)

    // console.log('ctx.userInf=>',', userInfo) ctx.userInfo)
 }
 /**
  * @description 获取用户信息
  * @param {}} ctx 
  */
 const getUserList = async (page, size, userName) => {
    // 查询所有的用户
    const res = await findAllUser(page, size, userName)
    return new SuccessModel(res)
 }

 const delUser = async (id) => {
     const res = await deleteUser(id)
     if (res) {
         return new SuccessModel()
     }
     return new ErrorModel({msg: '删除失败'})
 }

 const editUser = async({id, userName, nickName, gender, city}) => {
     const userInfo = await getUserInfoWidthId(id)
     if (!userInfo) {
         return new ErrorModel({msg: '用户不存在'})
     }
     const newVal = {
        userName: userName,
        nickName: nickName,
        gender: gender,
        city: city
     }
     const updateParams = {
         id
     }
    const res = await updateUser(newVal, updateParams)

    if (res[0] <= 0) {
        return new ErrorModel({msg: '信息更新失败'})
    }
    return new SuccessModel()
 }
 // 批量创建
 const quickCreate = async() => {
    const list = []
    for(var i = 0; i<10; i++ ) {
        list.push({
            userName: `测试${i}`,
            password:encrypt(123),
            nickName:`测试1${i}`,
            city: '中国'
        })
    }
     try {
       const res = await qkCreateUser(list)
     } catch (error) {
         console.log('quickCreate=>', error)
     }
 }
 module.exports = {
     isExist,
     register,
     login,
     info,
     getUserList,
     delUser,
     editUser,
     quickCreate
 }