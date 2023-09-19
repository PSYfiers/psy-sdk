const AbstractEntity = require("./AbstractEntity")
const GoodsGroup = require("./GoodsGroup")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const validate = require("../modules/validate")

module.exports = class Goods extends AbstractEntity {
    constructor(data) {
        super(Goods)
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
        if (validate.isNumber)
            this._id = id
        else
            throw new Error("Parameter must be of type number")
    }

    get id() {
        return this._id
    }

    set goodsGroup(goodsGroup) {
        if (goodsGroup instanceof GoodsGroup) {
            this._goodsGroup = goodsGroup.id
        } else if (validate.isNumber(goodsGroup)) {
            this._goodsGroup = goodsGroup
        } else {
            throw new Error("Parameter must be of type GoodsGroup or number")
        }
    }

    get goodsGroup() {
        return this._goodsGroup
    }

    set included(included) {
        if (validate.isDate(included))
            this._included = included
        else
            throw new Error("Parameter must be of type Date")
    }

    get included() {
        return this._included
    }

    set rejected(rejected) {
        if (validate.isDate(rejected))
            this._rejected = rejected
        else
            throw new Error("Parameter must be of type Date")
    }

    get rejected() {
        return this._rejected
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
        this._goodsGroup = validate.isNumber(data.goodsGroup, validate.NOT_NULL) ? data.goodsGroup : null
        this._included = validate.isDate(data.included, validate.NOT_NULL) ? data.included : new Date()
        this._rejected = validate.isDate(data.rejected, validate.NOT_NULL) ? data.rejected : null
        this._specs = validate.isObject(data.specs, validate.NOT_NULL) ? data.specs : {}
        this._names = validate.isObject(data.names, validate.NOT_NULL) ? data.names : {}
        this._descriptions = validate.isString(data.descriptions, null, validate.NOT_NULL) ? data.descriptions : {}
    }

    _validate(create = false) {
        if (!create) {
            if (validate.isEmpty(this._id)) return false
        }
        if (validate.isEmpty(this._goodsGroup)) return false
        if (validate.isEmpty(this._names)) return false
        if (Object.keys(this._names).length !== defaults.supportedLanguages.length) return false
        if (validate.isEmpty(this._specs)) this._specs = {}
        if (validate.isEmpty(this._included)) this._included = new Date()

        return true
    }

    create() {
        return this.__({
            method: httpRequest.POST,
            path: "/goods/create",
            parseResult: httpRequest.JSON,
            create: true,
            validator: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/goods/read",
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
            path: "/goods/update",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/goods/delete",
            parseResult: null,
            delete: true,
            params: {
                id: {
                    value: this._id,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    getGoodsGroup() {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(this._goodsGroup, validate.NOT_NULL)) {
                try {
                    let group = new GoodsGroup()
                    group.id = this._goodsGroup
                    group.read()
                        .then(() => {
                            resolve(group)
                        })
                        .catch(err => {
                            reject(err)
                        })

                } catch (err) {
                    reject(err)
                }
            } else {
                reject({
                    status: 400,
                    message: "No goods group ID defined"
                })
            }
        })
    }

    copyTo(newName) {
        return this.__({
            method: httpRequest.GET,
            path: "/goods/copy",
            params: {
                id: {
                    value: this._id,
                    validate: "number",
                    required: true
                },
                name: {
                    value: newName,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                return data.id
            }
        })
    }

    bindPath(path) {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(this._id, validate.NOT_NULL)) {
                if (path) {
                    if (validate.isPath(path, validate.NOT_NULL)) {
                        this.boundPaths().then(paths => {
                            if (!paths.includes(path)) {
                                httpRequest.request(httpRequest.GET, defaults.BASE + "/goods/map/url", null, {
                                    id: this._id,
                                    url: path
                                })
                                    .then(() => {
                                        resolve()
                                    })
                                    .catch(err => {
                                        reject({
                                            status: err.status,
                                            message: "Error binding path to goods"
                                        })
                                    })
                            } else {
                                reject({
                                    status: 400,
                                    message: "The passed path is already bound to this goods"
                                })
                            }
                        })
                    } else {
                        reject({
                            status: 400,
                            message: "A path may only have the letters A-Z, the numbers 0-9, a hyphen (-) and an underscore (_)."
                        })
                    }

                } else {
                    reject({
                        status: 400,
                        message: "Please set a new path"
                    })
                }
            } else {
                reject({
                    status: 400,
                    message: "Please set the goods ID first"
                })
            }
        })
    }

    solvePath(path) {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(this._id, validate.NOT_NULL)) {
                if (path) {
                    if (validate.isPath(path, validate.NOT_NULL)) {
                        this.boundPaths().then(paths => {
                            if (paths.includes(path)) {
                                httpRequest.request(httpRequest.GET, defaults.BASE + "/goods/unmap/url", null, {
                                    id: this._id,
                                    url: path
                                })
                                    .then(() => {
                                        resolve()
                                    })
                                    .catch(err => {
                                        reject({
                                            status: err.status,
                                            message: "Error while solve path from goods"
                                        })
                                    })
                            } else {
                                reject({
                                    err: 400,
                                    messaage: "The passed path is not bound to this goods"
                                })
                            }
                        })
                    } else {
                        reject({
                            status: 400,
                            message: "A path may only have the letters A-Z, the numbers 0-9, a hyphen (-) and an underscore (_)."
                        })
                    }

                } else {
                    reject({
                        status: 400,
                        message: "Please set the path to solve"
                    })
                }
            } else {
                reject({
                    status: 400,
                    message: "Please set the goods ID first"
                })
            }
        })
    }

    boundPaths() {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(this._id, validate.NOT_NULL)) {
                httpRequest.request(httpRequest.GET, defaults.BASE + "/goods/mapped/urls", null, { id: this._id })
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            message: "Error reading bound paths"
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "Please set the goods ID first"
                })
            }
        })
    }

    static isUsed(id) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goods/isused",
            params: {
                id: {
                    value: id,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                return data.used
            }
        })
    }

    static availablePaths() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goods/available/urls",
            returnCb: data => {
                let paths = []
                if (data) {
                    if (data[0].specs) {
                        for (let i = 0, len = data.length; i < len; i++) {
                            paths.push({
                                path: data[i].path,
                                goods: data[i].specs.goods
                            })
                        }
                    } else {
                        paths = data
                    }
                }
                return paths
            }
        })
    }

    static getDeliveryAddresses(goodsIds) {
        return new Promise((resolve, reject) => {
            let array = "{" + JSON.stringify(goodsIds).replace(/\[/g, "").replace(/]/g, "") + "}"
            httpRequest.request(httpRequest.GET, defaults.BASE + "/goods/deliveryaddress", null, { ids: array })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject({
                        status: err.status,
                        message: "Error request delivery addresses"
                    })
                })
        })
    }

    static isModeratorNeeded(goodsIds) {
        return new Promise((resolve, reject) => {
            let array = "{" + JSON.stringify(goodsIds).replace(/\[/g, "").replace(/]/g, "") + "}"
            httpRequest.request(httpRequest.GET, defaults.BASE + "/goods/moderator", null, { ids: array })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject({
                        status: err.status,
                        message: "Error request moderator status"
                    })
                })
        })
    }

    static count() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goods/count",
            returnCb: data => {
                return data.count
            }
        })
    }

    static readAll(limit, offset) {
        return new Promise((resolve, reject) => {
            let params = validate.isNumber(limit, validate.NOT_NULL) ? { limit: limit } : null
            if (params && validate.isNumber(offset, validate.NOT_NULL)) {
                params.offet = offset
            }
            httpRequest.request(httpRequest.GET, defaults.BASE + "/goods/read/all", null, params)
                .then(data => {
                    let goods = []
                    for (let i = 0, len = data.length; i < len; i++) {
                        goods.push(new Goods(data[i]))
                    }
                    resolve(goods)
                })
                .catch(err => {
                    reject({
                        status: err.status,
                        message: "Error while reading goods"
                    })
                })
        })
    }

    static listOptions(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goods/list",
            params: {
                lang: {
                    value: languageId,
                    validate: "languageId",
                }
            },
            returnResult: true
        })
    }

    static search(pattern) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/goods/search",
            params: {
                pattern: {
                    value: pattern,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                let goods = []
                for (let i = 0, len = data.length; i < len; i++) {
                    goods.push(new Goods(data[i]))
                }
                return goods
            }
        })
    }

}