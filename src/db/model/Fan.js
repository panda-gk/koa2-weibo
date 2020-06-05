/**
 * 关注的粉丝
 */
const seq = require('../seq')
const { INTEGER } = require('../types')
const Fan = seq.define('fan', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户的id'
    },
    fanId: {
        type: INTEGER,
        allowNull: false,
        comment: '粉丝的id'
    }
})
module.exports = Fan