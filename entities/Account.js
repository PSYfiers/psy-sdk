const AbstractEntity = require("./AbstractEntity")
const Address = require("./Address")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Account extends AbstractEntity {
    constructor(data) {
        super(Account)
        this._specs = {}
        this._addresses = []
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

    set companyName(companyName) {
        if (validate.isString(companyName))
            this._companyName = companyName
        else
            throw new Error("Parameter must be of type string")
    }

    get companyName() {
        return this._companyName
    }

    set phone(phone) {
        if (validate.isString(phone))
            this._phone = phone
        else
            throw new Error("Parameter must be of type string")
    }

    get phone() {
        return this._phone
    }

    set taxNumber(taxNumber) {
        if (validate.isString(taxNumber))
            this._taxNumber = taxNumber
        else
            throw new Error("Parameter must be of type string")
    }

    get taxNumber() {
        return this._taxNumber
    }

    set vatNumber(vatNumber) {
        if (validate.isString(vatNumber))
            this._vatNumber = vatNumber
        else
            throw new Error("Parameter must be of type string")

    }

    get vatNumber() {
        return this._vatNumber
    }

    get addresses() {
        return this._addresses === null ? [] : this._addresses
    }

    set isPrivate(isPrivate) {
        if (validate.isBoolean(isPrivate))
            this._isPrivate = isPrivate
        else
            throw new Error("Parameter must be of type boolean")

    }

    get isPrivate() {
        return this._isPrivate
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

    get specs() {
        return this._specs === null ? {} : this._specs
    }

    get created() {
        return this._created === null ? new Date() : this._created
    }

    _parseJson(data) {
        this._id = validate.isNumber(data.id, validate.NOT_NULL) ? data.id : null
        this._companyName = validate.isString(data.companyName, null, validate.NOT_NULL) ? data.companyName : null
        this._phone = validate.isString(data.phone, null, validate.NOT_NULL) ? data.phone : null
        this._taxNumber = validate.isString(data.taxNumber, null, validate.NOT_NULL) ? data.taxNumber : null
        this._vatNumber = validate.isString(data.vatNumber, null, validate.NOT_NULL) ? data.vatNumber : null
        this._isPrivate = validate.isBoolean(data.isPrivate, validate.NOT_NULL) ? data.isPrivate : false
        this._specs = validate.isObject(data.specs, validate.NOT_NULL) ? data.specs : {}
        this._active = validate.isBoolean(data.active, validate.NOT_NULL) ? data.active : true
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : new Date()
        if (data.addresses && data.addresses.length) {
            this._addresses = []
            for (let i = 0, len = data.addresses.length; i < len; i++) {

                this._addresses.push(new Address(data.addresses[i]))
            }
        }
    }

    _validate(create = false) {

        if (!create) {
            console.log(validate.isEmpty(this._id))
            if (validate.isEmpty(this._id)) return false
        }

        console.log(this._addresses === null || !this._addresses.length)
        if (this._addresses === null || !this._addresses.length) return false

        this._addresses.forEach(address => {
            console.log(!address._validate())
            if (!address._validate()) return false
        })

        return true
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/account/read",
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
            path: "/account/update",
            parseResult: null,
            body: this,
            validator: true
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/account/delete",
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

    deactivate() {
        return this.__({
            method: httpRequest.GET,
            path: "/account/deactivate",
            parseResult: null,
            returnCb: () => {
                this._active = false
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

    copy(newName) {
        return this.__({
            method: httpRequest.GET,
            path: "/account/copy",
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
            returnCb: async (data) => {
                console.log(data)
                await this.read()
                let accountData = this.toJson()
                accountData.id = data.id
                accountData.companyName = newName
                return new Account(accountData)
            }
        })
    }

    deleteClientSpecs() {
        return this.__({
            method: httpRequest.GET,
            path: "/account/delete/clientspecs",
            params: {
                id: {
                    value: this._id,
                    validate: "number",
                    required: true
                }
            },
            returnCb: () => {
                if (this._specs.client) {
                    delete this._specs.client
                }
            }
        })
    }

    copyClientSpecs(goodId) {
        return this.__({
            method: httpRequest.GET,
            path: "/account/copy/clientspecs",
            params: {
                from: {
                    value: goodId,
                    validate: "number",
                    required: true
                },
                to: {
                    value: this._id,
                    validate: "number",
                    required: true
                }
            },
            returnCb: async () => {
                await this.read()
            }
        })
    }

    static readAll(limit, offset) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/account/read/all",
            params: {
                limit: {
                    value: limit,
                    validate: "number"
                },
                offset: {
                    value: offset,
                    validate: "number"
                }
            },
            returnCb: data => {
                let accounts = []
                for (let i = 0, len = data.length; i < len; i++) {
                    accounts.push(new Account(data[i]))
                }
                return accounts
            }
        })
    }

    static listClientSpecs(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/account/list/clientspecs",
            returnResult: true,
            params: {
                lang: {
                    value: languageId,
                    validate: "supportedLanguaguages"
                }
            }
        })
    }

    static exists(accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/account/exists",
            parseResult: httpRequest.BOOL,
            returnResult: true,
            params: {
                id: {
                    value: accountId,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    static confirm(key, path) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/account/confirm/" + path,
            parseResult: httpRequest.STRING,
            preValidate: {
                key: {
                    value: key,
                    validate: "string",
                    required: true
                },
                path: {
                    value: path,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static count() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/account/count",
            returnCb: (data) => {
                return data.count
            }
        })
    }

    static search(pattern, page, rows) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/account/search/companyname",
            params: {
                pattern: {
                    value: pattern,
                    validate: "string",
                    required: true
                },
                page: {
                    value: page,
                    validate: "number",
                    required: true
                },
                rows: {
                    value: rows,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                let accounts = []
                for (let i = 0, len = data.length; i < len; i++) {
                    accounts.push(new Account(data[i]))
                }
                return accounts
            }
        })
    }

}