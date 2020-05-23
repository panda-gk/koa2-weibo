/**
 * @description post 接口单元测试
 */

 const server = require('./server')

 test('login 接口返回正常', async () => {
     const res = server.post('/users/login').send({
        userName: '张三',
        psd: '123',
     })
     expect(res.body).toEqual({
        userName: '张三',
        psd: '123',
     })
 })