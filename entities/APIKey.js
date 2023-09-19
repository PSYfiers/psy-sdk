const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class APIKey extends AbstractEntity {
    constructor(data) {
        super(APIKey)
        this._active = true
        this._created = new Date()
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isString(data))
                this._id = data
        }
    }

    set id(id) {
        if (validate.isString(id))
            this._id = id
        else
            throw new Error("Parameter must be of type string")
    }

    get id() {
        return this._id
    }

    get secret() {
        return this._secret
    }

    set accountId(accountId) {
        if (validate.isNumber(accountId))
            this._accountId = accountId
        else
            throw new Error("Parameter must be of type number")
    }

    get accountId() {
        return this._accountId
    }

    set name(name) {
        if (validate.isString(name))
            this._name = name
        else
            throw new Error("Parameter must be of type string")
    }

    get name() {
        return this._name
    }

    set description(description) {
        if (validate.isString(description))
            this._description = description
        else
            throw new Error("Parameter must be of type string")
    }

    get description() {
        return this._description
    }

    set active(active) {
        if (validate.isBoolean(active))
            this._active = active
        else
            throw new Error("Parameter must be of type boolean")
    }

    get active() {
        return this._active
    }

    get created() {
        return this._created
    }

    _parseJson(data) {
        this._id = validate.isString(data.id, null, validate.NOT_NULL) ? data.id : null
        this._secret = validate.isString(data.secret, null, validate.NOT_NULL) ? data.secret : null
        this._accountId = validate.isNumber(data.accountId, validate.NOT_NULL) ? data.accountId : null
        this._name = validate.isString(data.name, null, validate.NOT_NULL) ? data.name : null
        this._description = validate.isString(data.description, null, validate.NOT_NULL) ? data.description : null
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : new Date()
        this._active = validate.isBoolean(data.active, validate.NOT_NULL) ? data.active : false
    }

    _validate(create = false) {
        if (!create) {
            if (validate.isEmpty(this._id)) return false
            if (validate.isEmpty(this._secret)) return false
        }
        if (validate.isEmpty(this._accountId)) return false
        if (validate.isEmpty(this._active)) this._active = true

        return true
    }

    create() {
        return this.__({
            method: httpRequest.POST,
            path: "/apikey/create",
            parseResult: httpRequest.JSON,
            validator: true,
            create: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/apikey/read",
            parseResult: httpRequest.JSON,
            params: {
                id: {
                    value: this._id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    update() {
        return this.__({
            method: httpRequest.POST,
            path: "/apikey/update",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/apikey/delete",
            parseResult: null,
            delete: true,
            params: {
                id: {
                    value: this._id,
                    validate: "string",
                    required: true
                }
            }
        })
    }
}