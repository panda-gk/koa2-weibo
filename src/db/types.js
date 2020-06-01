
/**
 * @description 数据库类型定义
 */
const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL, // 下拉
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER, // 整数
    BOOLEAN: Sequelize.BOOLEAN
}