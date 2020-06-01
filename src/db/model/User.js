
/**
 * @description 创建users 表
 */
const seq = require('../seq')
const types = require('../types')
const User = seq.define('user', {
    userName: {
        type: types.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名唯一'
    },
    password: {
        type: types.STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: types.STRING,
        comment: '昵称'
    },
    gender: {
        type: types.DECIMAL,
        allowNull: false,
        comment: '性别（1 男 2 女 3 保密）',
        defaultValue: 3, // 默认值
    },
    picture: {
        type: types.STRING,
        comment: '头像'
    },
    city: {
        type: types.STRING,
        comment: '城市'
    }
})
module.exports = User