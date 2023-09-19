const AbstractEntity = require("./AbstractEntity")
const BankAccount = require("./BankAccount")
const Country = require("./Country")
const httpRequest = require("../lib/httpRequest")
const validate = require("../modules/validate")


module.exports = class Creditor extends AbstractEntity {
    constructor(data) {
        super(Creditor)
        this._bankAccounts = []
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
            throw new Error("Parameter must be of type string")
    }

    get id() {
        return this._id
    }

    set uid(uid) {
        if (validate.isString(uid))
            this._uid = uid
        else
            throw new Error("Parameter must be of type string")
    }

    get uid() {
        return this._uid
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

    set street(street) {
        if (validate.isString(street))
            this._street = street
        else
            throw new Error("Parameter must be of type string")
    }

    get street() {
        return this._street
    }

    set number(number) {
        if (validate.isString(number))
            this._number = number
        else
            throw new Error("Parameter must be of type string")
    }

    get number() {
        return this._number
    }

    set postcode(postcode) {
        if (validate.isString(postcode))
            this._postcode = postcode
        else
            throw new Error("Parameter must be of type string")
    }

    get postcode() {
        return this._postcode
    }

    set city(city) {
        if (validate.isString(city))
            this._city = city
        else
            throw new Error("Parameter must be of type string")
    }

    get city() {
        return this._city
    }

    set country(country) {
        this._country = typeof country === Country ? country : typeof country === "string" ? new Country(country) : null
    }

    get country() {
        return this._country
    }

    get bankAccounts() {
        return this._bankAccounts ? this._bankAccounts : []
    }


    _parseJson(data) {
        this._id = validate.isNumber(data.id, validate.NOT_NULL) ? data.id : null
        this._uid = validate.isString(data.uid, null, validate.NOT_NULL) ? data.uid : null
        this._name = validate.isString(data.name) ? data.name : null
        this._street = validate.isString(data.street, null, validate.NOT_NULL) ? data.street : null
        this._number = validate.isString(data.number, null, validate.NOT_NULL) ? data.number : null
        this._postcode = validate.isString(data.postcode, null, validate.NOT_NULL) ? data.postcode : null
        this._city = validate.isString(data.city, null, validate.NOT_NULL) ? data.city : null
        this._country = data.country
            ? typeof data.country === Country
                ? data.country
                : typeof data.country === "object"
                    ? new Country(data.country)
                    : null
            : null
        this._bankAccounts = []
        if (data.bankAccounts && data.bankAccounts.length) {
            for (let i = 0, len = data.bankAccounts.length; i < len; i++) {
                this._bankAccounts.push(new BankAccount(data.bankAccounts[i]))
            }
        }
    }

    _validate(create = false) {
        if (!create) {
            if (validate.isEmpty(this._id)) return false
        }
        if (validate.isEmpty(this._uid)) return false
        if (validate.isEmpty(this._name)) return false
        if (validate.isEmpty(this.street)) return false
        if (validate.isEmpty(this.number)) return false
        if (validate.isEmpty(this._postcode)) return false
        if (validate.isEmpty(this._city)) return false
        if (!validate.isCountryId(this._coutry)) return false
        if (this._bankAccounts === null) this._bankAccounts = []
        if (!this._bankAccounts.length) return false
        for (let i = 0, len = this._bankAccounts.length; i < len; i++) {
            if (!this._bankAccounts[i]._validate()) return false
        }
        return true
    }

    create() {
        return this.__({
            method: httpRequest.POST,
            path: "/creditor/create",
            parseResult: httpRequest.JSON,
            validator: true,
            create: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/creditor/read",
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
            path: "/creditor/update",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/creditor/delete",
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
            path: "/creditor/read/all",
            returnCb: data => {
                let creditors = []
                for (let i = 0, len = data.length; i < len; i++) {
                    creditors.push(new Creditor(data[i]))
                }
                return creditors
            }
        })
    }


}