const { Blog, User, Fan } = require('../db/model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const getAllUserWidthOutSelf = async (id) => {
    const res = await User.findAll({
        where: {
            id: {
                [Op.ne]: id
            }
        }
    })
    return res.map(el => el.dataValues)
}
const toBeOtherFans = async (userId, fanId) => {
    await Fan.create({
        userId, 
        fanId
    })
}
// 我的关注的
// const selfToBeFan = async (id) => {
//     console.log('selfToBeFan =>', id)

//     // 从 fan 表查询
//     // const res = await Fan.findAll({
//     //     where: {
//     //         fanId:id,
//     //     },
//     //     include: {
//     //         model: User,
//     //     }
//     // })

//     // user查询
//     // const res2 = await User.findAll({
//     //     include: {
//     //         model: Fan,
//     //         where: {
//     //             fanId: id,
//     //         }
//     //     }
//     // })
//     console.log('selfToBeFan =>',res)
//     return res
//     // console.log('selfToBeFan2 =>',res2)
//     // return id

// }
// 我关注的
const getFan = async (id) => {
   // 我关注的 即我是别人的粉丝
   // 1. 映射关系 user -> userId -> (fan)
   // 2. 原理 通过fan -> userId-> user 
   // 3 查询条件 fanId == 我的 ID 查不出来不同的userId
 // 需要不同的userId => user user.hasMany(fan)
   const res = await User.findAll({
       include: {
           model: Fan,
           where: {
               fanId:id,
           }
       }
   })
    return res.map(el => {
        const user = el.dataValues
        // delete user.fans
        return user
    })
}
const myFans = async (id) => {
    // 获取我的粉丝
    // 1. 映射关系 fan -> fanId -> 粉丝信息（user）
    // 2 .所以查询条件 找到 fan => userId == 我的 就可以查到 user表 fanId => 粉丝信息
    // fan表 一直用的是 fanId 命中用户信息 如果我在fan表里面 通过 fanId查找出来的表信息 fanId 是一样的 所以返回的 fanId => user信息也是一样的
    // 需要不同的fanId -> user
    const res = await Fan.findAll({
        where: {
            userId:id
        },
        include: {
            model: User
        }
    })
    console.log(res.map(el => {
        const user = el.dataValues

        return user
    }))
    return res.map(el => {
        const user = el.dataValues
        // delete user.fans
        return user
    })
}
module.exports = {
    getAllUserWidthOutSelf,
    toBeOtherFans,
    myFans,
    // selfToBeFan,
    getFan
}