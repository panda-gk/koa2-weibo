/**
 * @description 密码加密
 */
// 加密
 const crypto = require('crypto')

 const { PSD_KEY } = require('../conf/constant')

/**
 * 加密方法
 * @param {sting} content 
 */
 const _md5 = (content) => {
     const md5 = crypto.createHash('md5')
     //使用十六位进制加密
     return md5.update(content).digest('hex')

 }
// 加密
 const doCrypto = (content) => {
    //  固定格式
    const str = `password=${content}&key=${PSD_KEY}`
    return _md5(str)
 }

 module.exports = doCrypto