const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")


module.exports = class Defaults extends AbstractEntity {
    constructor(data) {
        super(Defaults)
        if (data) {
            this._parseJson(data)
        }
    }

    get mode() {
        return this._mode
    }

    get supportedLanguages() {
        return this._supportedLanguages
    }

    get defaultLanguage() {
        return this._defaultLanguage
    }

    get currency() {
        return this._currency
    }

    get paymentTarget() {
        return this._paymentTarget
    }

    get hideInvoices() {
        return this._hideInvoices
    }

    get defaultAppPath() {
        return this._defaultAppPath
    }

    get tanListStyle() {
        return this._tanListStyle
    }

    get defaultTemplate() {
        return this._defaultTemplate
    }

    get defaultPublicCaption() {
        return this._defaultPublicCaption
    }

    get resultWithTan() {
        return this._resultWithTan
    }

    get externalDomain() {
        return this._externalDomain
    }

    get vipDefaultLanguage() {
        return this._vipDefaultLanguage
    }

    get confirmedPage() {
        return this._confirmedPage
    }

    get alreadyConfirmedPage() {
        return this._alreadyConfirmedPage
    }

    _parseJson(data) {
        this._mode = data.mode ? data.mode : null
        this._supportedLanguages = data.supportedLanguages ? data.supportedLanguages : []
        this._defaultLanguage = data.defaultLanguage ? data.defaultLanguage : null
        this._currency = data.currency ? data.currency : null
        this._paymentTarget = data.paymentTarget ? data.paymentTarget : null
        this._hideInvoices = data.hideInvoices ? data.hideInvoices : false
        this._defaultAppPath = data.defaultAppPath ? data.defaultAppPath : null
        this._tanListStyle = data.tanListStyle ? data.tanListStyle : null
        this._defaultTemplate = data.defaultTemplate ? data.defaultTemplate : null
        this._defaultPublicCaption = data.defaultPublicCaption ? data.defaultPublicCaption : null
        this._resultWithTan = data.resultWithTan ? data.resultWithTan : false
        this._externalDomain = data.externalDomain ? data.externalDomain : null
        this._vipDefaultLanguage = data.vipDefaultLanguage ? data.vipDefaultLanguage : null
        this._confirmedPage = data.confirmedPage ? data.confirmedPage : null
        this._alreadyConfirmedPage = data.alreadyConfirmedPage ? data.alreadyConfirmedPage : null
    }

    read() {
        return new Promise((resolve, reject) => {
            httpRequest.request(httpRequest.GET, defaults.BASE + "/defaults/all")
                .then(data => {
                    this._parseJson(data)
                    resolve()
                })
                .catch(err => {
                    reject({
                        status: 500,
                        message: "Error reading defaults",
                        error: err
                    })
                })
        })
    }
}