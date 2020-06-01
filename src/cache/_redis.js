/**
 * @description 操作redis get set
 */

 const redis = require('redis')

 const { redisConf } = require('../conf/db')

 const redisClient = redis.createClient( redisConf.port, redisConf.host )

 redisClient.on('error', err => {
     console.error('redis error => ', err)
 })

//  set 
/**
 * 
 * @param {string} key key
 * @param {string} val  val
 * @param {number} timeout 过期时间 单位 s
 */
const set = ( key, val, timeout= 60 * 60 ) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    // 原生的set
    redisClient.set(key, val)
    // 超时
    redisClient.expire(key, timeout)
}

// get
/**
 * 
 * @param {string} key key
 */
const get = (key) => {
    const promise = new Promise((resolve, reject) => { 
        
        redisClient.get(key, (err, val) => {
            // 报错
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(val)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}