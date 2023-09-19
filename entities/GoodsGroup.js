const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

module.exports = class GoodsGroup extends AbstractEntity {
    constructor(data) {
        super(GoodsGroup)
        this._specs = {}
        this._names = {}
        this._descriptions = {}
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isNumber(data))
                this._id = data
        }
    }

    set id(id) {
        if (validate.isNumber(id))
            this._id = id
        else
            throw new Error("Parameter must be of type number")
    }

    get id() {
        return this._id
    }

    get specs() {
        return this._specs
    }

    get names() {
        return this._names
    }

    get descriptions() {
        return this._descriptions
    }

    _parseJson(data) {
        this._id = validate.isNumber(data.id, validate.NOT_NULL) ? data.id : null
        this._specs = validate.isObject(data.specs, validate.NOT_NULL) ? data.specs : {}
        this._names = validate.isObject(data.names, validate.NOT_NULL) ? data.names : null
        this._descriptions = validate.isObject(data.descriptions, validate.NOT_NULL) ? data.descriptions : null
    }

    _validate(create = false) {
        if (!create) {
            if (validate.isEmpty(this._id)) return false
        }
        if (!validate.isObject(this._names)) this._names = {}
        if (Object.keys(this._names).length !== defaults.supportedLanguages.length) return false

        return true
    }

    create() {
        return this.__({
            method: httpRequest.POST,
            path: "/goodsgroup/create",
            parseResult: httpRequest.JSON,
            validator: true,
            create: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/goodsgroup/read",
            parseResult: httpRequest.JSON,
            params: {
                id: {
                    value: this._id,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    update() {
        return this.__({
            method: httpRequest.POST,
            path: "/goodsgroup/update",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/goodsgroup/delete",
            delete: true,
            parseResult: null,
            params: {
                id: {
                    value: this._id,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    static readAll() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goodsgroup/read/all",
            returnCb: data => {
                let groups = []
                for (let i = 0, len = data.length; i < len; i++) {
                    groups.push(new GoodsGroup(data[i]))
                }
                return groups
            }
        })
    }

    static hasShippingcosts() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goodsgroup/check/shippingcosts",
            returnCb: data => {
                return data.exists
            }
        })
    }

    static whoHasShippingcosts() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goodsgroup/shippingcosts/id",
            returnCb: data => {
                return data.id
            }
        })
    }

}