/**
 * @description 获取数据
 */
const { formatUser } = require('./_format')

 // 引用数据库
 const { User, Blog } = require('../db/model')
 
 /**
  * 获取用户信息
  * @param {string} userName 
  * @param {string} password 
  */
 const getUserInfo = async (userName, password) => {
    // 查询数据库
    const opts = {
        userName
    }
    if (password) {
        opts.password = password
    }
    const res = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where:opts
    })
    if (res == null) {
        return res
    }
    return formatUser(res.dataValues)
 }

 const createUser = async ({userName, password, nickName, gender}) => {
     const params = {
         userName,
         password,
         nickName,
         gender,
     }

    await User.create(formatUser(params))
 }

// 查询所有的用户
const findAllUser = async (page = 1, size = 10, userName) => {
    const opts = {
        userName
    }
 const searchParams = {
    limit: +size,
    offset: (page - 1) * 10 || 0,
 }
 if (userName) {
     searchParams.where = opts
 }
  const res = await User.findAndCountAll(searchParams)
  return { 
      total: res.count, 
      list: res.rows.map(el => el.dataValues),
      page: +page
    }
}

// 删除用户
/**
 * @description 删除用户
 * @param {string} id 
 */
const deleteUser = async(id) => {
    // const opts = {
    //     id
    // }
    // const res = await User.findOne({where:opts})
    // console.log('deleteUser =>', res)
    // const res = await User.destroy({
    //     where:{
    //         id
    //     }
    // })
    // // 返回行数 >0 代表删除成功
    // return res > 0

    // 1 找到 当前user下面的所有文章 删除
    //2 删除当前user
  const res = await User.findAndCountAll({
        where: {
            id
        },
        include: [
            {
                model: Blog,
            }
        ]
    })
    
    console.log(res.rows[0].dataValues.blogs)
}
const getUserInfoWidthId = async (id) => {
    const opts = {
        id
    }
    const res = await User.findOne({where:opts})
    return res.dataValues
}
/**
 * 更新数据
 * @param {object} param0 
 */
const updateUser = async (newVal, opts) => {
    const res = await User.update(
        newVal,
        {
            where:opts
        }
    )
    return res
}
// 批量创建用户
const qkCreateUser = async(userList) => {

    const res = await User.bulkCreate(userList)
    return res
}
 module.exports = {
    getUserInfo,
    createUser,
    findAllUser,
    deleteUser,
    updateUser,
    qkCreateUser,
    getUserInfoWidthId
 }