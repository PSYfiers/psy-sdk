const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Addresstype extends AbstractEntity {
    constructor(data) {
        super(Addresstype)
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isNumber(data))
                this._id = data
        }
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    _parseJson(data) {
        this._id = validate.isNumber(data.id, validate.NOT_NULL) ? data.id : null
        this._name = validate.isString(data.name, null, validate.NOT_NULL) ? data.name : null
    }

    readAll() {
        return this.__({
            method: httpRequest.GET,
            path: "/address/type/read/all",
            returnCb: data => {
                let addresstypes = []
                for (let i = 0, len = data.length; i < len; i++) {
                    let addressType = new Addresstype(data[i])
                    addressType.__connection = this.connection
                    addresstypes.push(addressType)
                }
                return addresstypes
            }
        })        
    }

    static readAll() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/address/type/read/all",
            returnCb: data => {
                let addresstypes = []
                for (let i = 0, len = data.length; i < len; i++) {
                    addresstypes.push(new Addresstype(data[i]))
                }
                return addresstypes
            }
        })        
    }
}