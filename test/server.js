
/**
 * @description jest http
 */
const request = require('supertest') // 测试http 请求

const server = require('../src/app').callback() // server服务

module.exports = request(server)