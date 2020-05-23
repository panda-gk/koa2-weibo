/**
 * @description 存储配置
 */

 // redis 的配置

 const redisConf = {
     port: 6379,
     host: '127.0.0.1'

 }

//  数据库的配置

const dbConf = {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'koa2_weibo_db',
}

 module.exports = {
    redisConf,
    dbConf
 }