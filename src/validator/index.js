/**
 * @description 校验 规则
 */
const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
})

const validate = require('./_validate')


const USER_SCHEMA = {
    type:'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        picture: {
            type: 'string',
            maxLength: 255
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
    const valid = ajv.validate(USER_SCHEMA, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = {
    userValidate
}