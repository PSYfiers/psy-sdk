const AbstractEntity = require("./AbstractEntity");
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

module.exports = class Document extends AbstractEntity {
    constructor(data) {
        super(Document)
        this._path = {}
        this._description = {}
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isNumber(data))
                this._id = data
        }
    }

    static get TYPE_VIDEO() {
        return "video"
    }

    static get TYPE_DOCUMENT() {
        return "doc"
    }

    static get TYPE_SOFTWARE() {
        return "software"
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

    get path() {
        return this._path
    }

    set goodId(goodId) {
        if (validate.isNumber(goodId))
            this._goodId = goodId
        else
            throw new Error("Parameter must be of type number")
    }

    get goodId() {
        return this._goodId
    }

    set type(type) {
        if ([Document.TYPE_DOCUMENT, Document.TYPE_VIDEO, Document.TYPE_SOFTWARE].includes(type))
            this._type = type
        else
            throw new Error("Parameter must be of type string, expected values are: \"doc\", \"video\", \"software\"")
    }

    get type() {
        return this._type
    }

    get description() {
        return this._description
    }

    _parseJson(data) {
        this._id = validate.isNumber(data.id, validate.NOT_NULL) ? data.id : null
        this._path = validate.isObject(data.path, null, validate.NOT_NULL) ? data.path : {}
        this._goodId = validate.isNumber(data.goodId, validate.NOT_NULL) ? data.goodId : null
        this._type = data.type && [Document.TYPE_DOCUMENT, Document.TYPE_VIDEO, Document.TYPE_SOFTWARE].includes(data.type)
            ? data.type
            : null
        this._description = validate.isObject(data.description, null, validate.NOT_NULL) ? data.description : {}
    }

    _validate(create = false) {
        if (!create) {
            if (validate.isEmpty(this._id)) return false
        }
        if (Object.keys(this._path).length !== defaults.supportedLanguages.length) { console.error("path wrong or missing"); return false }
        if (validate.isEmpty(this._goodId)) return false
        if (validate.isEmpty(this._type)) return false
        if (Object.keys(this._description).length !== defaults.supportedLanguages.length) return false

        return true
    }

    create() {
        return this.__({
            method: httpRequest.POST,
            path: "/docs/create",
            parseResult: httpRequest.JSON,
            validator: true,
            create: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/docs/read",
            returnCb: (data, reject) => {
                console.log(data)
                if (Object.keys(data).length) {
                    this._parseJson(data)
                    return
                } else {
                    reject({
                        status: 404,
                        message: "No documents found"
                    })
                }
            },
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
            path: "/docs/update",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/docs/delete",
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

    static readAll(goodId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/docs/read/all",
            params: {
                gid: {
                    value: goodId,
                    validate: "number",
                    required: true
                }
            },
            returnCb: (data, reject) => {
                if (data.length) {
                    let documents = []
                    for (let i = 0, len = data.length; i < len; i++) {
                        documents.push(new Document(data[i]))
                    }
                    return documents
                } else {
                    reject({
                        status: 404,
                        message: "No documents found"
                    })
                }
            }
        })
    }

    static categorized(accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/docs/categorized",
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                }
            },
            returnCb: (data, reject) => {
                if (data.length) {
                    let documents = []
                    for (let i = 0, len = data.length; i < len; i++) {
                        documents.push(new Document(data[i]))
                    }
                    return documents
                } else {
                    reject({
                        status: 404,
                        message: "No documents found"
                    })
                }
            }
        })
    }
}
