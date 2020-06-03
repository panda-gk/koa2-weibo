const seq = require('../seq')

const { INTEGER, TEXT, STRING } = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    title: {
        type: STRING,
        allowNull: false,
        comment: '文章标题'
    },
    content: {
        type: TEXT,
        allowNull: null,
        comment: "文章内容"
    }
})
module.exports = Blog