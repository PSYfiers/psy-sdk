const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Invoice extends AbstractEntity {

    constructor(data) {
        super(Invoice)
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isString(data))
                this._id = data
        }
    }

    get id() {
        return this._id
    }

    get accountId() {
        return this._accountId
    }

    get Vat() {
        return this._vat === null ? 0.0 : this._vat
    }

    get vatPercentage() {
        return this._vatPercentage === null ? 0.0 : this._vatPercentage
    }

    get paymentTarget() {
        return this._paymentTarget === null ? 0 : this._paymentTarget
    }

    get paid() {
        return this._paid
    }

    get created() {
        return this._created
    }

    get companyName() {
        return this._companyName
    }

    get contactPerson() {
        return this._contactPerson
    }

    get languageId() {
        return this._languageId
    }

    get countryId() {
        return this._countryId
    }

    get postcode() {
        return this._postcode
    }

    get city() {
        return this._city
    }

    get street() {
        return this._street
    }

    get total() {
        return this._total === null ? 0.0 : this._total
    }

    get currency() {
        return this._currency
    }

    _parseJson(data) {
        this._id = validate.isString(data.id, null, validate.NOT_NULL) ? data.id : null
        this._accountId = validate.isNumber(data.accountId, validate.NOT_NULL) ? data.accountId : null
        this._vat = validate.isNumber(data.vat, validate.NOT_NULL) ? data.vat : 0.0
        this._vatPercentage = validate.isNumber(data.vatPercentage, validate.NOT_NULL) ? data.vatPercentage : 0.0
        this._paymentTarget = validate.isNumber(data.paymentTarget, validate.NOT_NULL) ? data.paymentTarget : 0
        this._paid = validate.isDate(data.paid, validate.NOT_NULL) ? data.paid : null
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : null
        this._companyName = validate.isString(data.companyName, null.validate.NOT_NULL) ? data.companyName : null
        this._contactPerson = validate.isString(data.contactPerson, null, validate.NOT_NULL) ? data.contactPerson : null
        this._languageId = validate.isLanguageId(data.languageId, validate.NOT_NULL) ? data.languageId : null
        this._countryId = validate.isCountryId(data.countryId, validate.NOT_NULL) ? data.countryId : null
        this._postcode = validate.isString(data.postcode, null, validate.NOT_NULL) ? data.postcode : null
        this._city = validate.isString(data.city, null, validate.NOT_NULL) ? data.city : null
        this._street = validate.isString(data.street, null, validate.NOT_NULL) ? data.street : null
        this._total = validate.isNumber(data.total, validate.NOT_NULL) ? data.total : 0.0
        this._currency = validate.isCurrency(data.currency, validate.NOT_NULL) ? data.currency : null
    }

    static getPdf(id) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/invoice/pdf",
            parseResult: httpRequest.RAW,
            returnResult: true,
            params: {
                id: {
                    value: id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static getUnpaid() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/invoice/unpaid",
            parseResult: null,
            returnCb: data => {
                let unpaid = []
                for (let i = 0, len = data.length; i < len; i++) {
                    unpaid.push(new Invoice(data[i]))
                }
                return unpaid
            }
        })
    }

    static markAsPaid(id) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/invoice/setpaid",
            parseResult: null,
            params: {
                id: {
                    value: id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static readAll(accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/invoice/read/all",
            parseResult: null,
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                let invoices = []
                for (let i = 0, len = data.length; i < len; i++) {
                    invoices.push(new Invoice(data[i]))
                }
                return invoices
            }
        })
    }

    static newCreditorReference() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/invoice/creditorreference/new",
            parseResult: httpRequest.STRING,
            returnResult: true
        })
    }
}