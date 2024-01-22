const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Country extends AbstractEntity {
    constructor(data) {
        super(Country)
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isCountryId(data))
                this._id = data
        }
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    _parseJson(data) {
        this._id = validate.isCountryId(data.id, validate.NOT_NULL) ? data.id : null
        this._name = validate.isString(data.name, null, validate.NOT_NULL) ? data.name : null
    }

    static readAll(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/country/read/all",
            params: {
                lang: {
                    value: languageId,
                    validate: "languageId"
                }
            },
            returnCb: data => {
                let countries = []
                for (let i = 0, len = data.length; i < len; i++) {
                    countries.push(new Country(data[i]))
                }
                return countries
            }
        })
    }

    static toSelectOptions(data) {
        let options = []
        if (validate.isArray(data)) {
            for (let i = 0, len = data.length; i < len; i++) {
                options.push({
                    value: data[i].id,
                    text: data[i].name
                })
            }
            options = options.sort((a, b) => {
                if (a.text < b.text) {
                    return -1
                }
                if (a.text > b.text) {
                    return 1
                }
                return 0
            })
        }
        return options
    }
}