/**
 * @description sequelize 实例
 * @author 双越老师
 */

const Sequelize = require('sequelize')
const { dbConf } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = dbConf
const conf = {
    host,
    dialect: 'mysql'
}

// 测试环境关闭日志 关闭sql语句
if (isTest) {
    conf.logging = () => {}
}

// 线上环境，使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小
        idle: 10000  // 如果一个连接池 10 s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf) // 连接数据库

module.exports = seq