const AbstractEntity = require("./AbstractEntity")
const validate = require("../modules/validate")

module.exports = class Address extends AbstractEntity {
    constructor(data) {
        super(Address)
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

    set isBilling(isBilling) {
        if (validate.isBoolean(isBilling))
            this._isBilling = isBilling
        else
            throw new Error("Parameter must be of type boolean")

    }

    get isBilling() {
        return this._isBilling
    }

    set countryId(countryId) {
        if (validate.isCountryId(countryId))
            this._countryId = countryId
        else
            throw new Error("Not a valid country ID")

    }

    get countryId() {
        return this._countryId
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

    set street(street) {
        if (validate.isString(street))
            this._street = street
        else
            throw new Error("Parameter must be of type string")

    }

    get street() {
        return this._street
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

    set postbox(postbox) {
        if (validate.isString(postbox))
            this._postbox = postbox
        else
            throw new Error("Parameter must be of type string")
    }

    get postbox() {
        return this._postbox
    }

    _parseJson(data) {
        this._id = validate.isNumber(data.id, validate.NOT_NULL) ? data.id : null
        this._isBilling = validate.isBoolean(data.isBilling, validate.NOT_NULL) ? data.isBilling : true
        this._countryId = validate.isCountryId(data.countryId, validate.NOT_NULL) ? data.countryId : null
        this._postcode = validate.isString(data.postcode, null, validate.NOT_NULL) ? data.postcode : null
        this._city = validate.isString(data.city, null, validate.NOT_NULL) ? data.city : null
        this._street = validate.isString(data.street, null, validate.NOT_NULL) ? data.street : null
        this._postbox = validate.isString(data.postbox, null, validate.NOT_NULL) ? data.postbox : null

    }

    _validate() {
        if (validate.isEmpty(this._isBilling)) this._isBilling = true
        if (validate.isEmpty(this._countryId)) return false
        if (validate.isEmpty(this._street)) return false
        if (validate.isEmpty(this._postcode)) return false
        if (validate.isEmpty(this._city)) return false
        return true
    }

}