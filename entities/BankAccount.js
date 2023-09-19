const AbstractEntity = require("./AbstractEntity");
const { validate } = require("psy-tools")

module.exports = class BankAccount extends AbstractEntity {
    constructor(data) {
        super(BankAccount)
        if (validate.isObject(data, validate.NOT_NULL))
            this._parseJson(data)
    }

    set iban(iban) {
        if (validate.isString(iban))
            this._iban = iban
        else
            throw new Error("Parameter must be of type string")
    }

    get iban() {
        return this._iban
    }

    set bic(bic) {
        if (validate.isString(bic))
            this._bic = bic
        else
            throw new Error("Parameter must be of type string")
    }

    get bic() {
        return this._bic
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

    _parseJson(data) {
        this._bic = validate.isString(data.bic, 11, validate.NOT_NULL) ? data.bic : null
        this._iban = validate.isString(data.iban, 42, validate.NOT_NULL) ? data.iban : null
        this._description = validate.isString(data.description, 100, validate.NOT_NULL) ? data.description : null
    }

    _validate() {        
        if (validate.isEmpty(this._iban)) return false
        return true
    }
}
