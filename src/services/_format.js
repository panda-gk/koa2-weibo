/**
 * @description 处理数据格式
 */

 const _formatUserPicture = (obj) => {
    if (obj.picture == null) {
        obj.picture = 'xxxxxx'
    }
    return obj
 }
/**
 * 
 * @param {Array | Object} list 
 */
 const formatUser = (list) => {
     if (list == null) {
         return list
     }
     if(Array.isArray(list)) {
         return list.map(_formatUserPicture)
     }
     return _formatUserPicture(list)
 }

 module.exports = {
     formatUser
 }