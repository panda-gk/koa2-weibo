/**
 * @description 数据处理
 */
class BaseModel {
    constructor({code, data, msg})  {
        this.code = code
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data) {
        super({
            code:0,
            data,
            msg: 'success'
        })
    }
}
class ErrorModel extends BaseModel {
    constructor({code=10000,msg}) {
        super({
            code,
            msg
        })
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}
