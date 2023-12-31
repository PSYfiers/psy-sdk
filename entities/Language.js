const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

/**
 * Language class 
 */
module.exports = class Language extends AbstractEntity {
    /**
     * 
     * @param {Object} data A data object containing all fields from the database
     */
    constructor(data) {
        super(Language)
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
            else if (validate.isLanguageId(data))
                this._id = data
        }
    }

    static get SUPPORTED_ONLY() {
        return true
    }

    set id(id) {
        if (validate.isLanguageId(id))
            this._id = id
        else
            throw new Error("Parameter must be of type string / language Id")
    }
    /**
     * Get id
     */
    get id() {
        return this._id
    }
    /**
     * Get name
     */
    get name() {
        return this._name
    }


    _parseJson(data) {
        this._id = validate.isLanguageId(data.id, validate.NOT_NULL) ? data.id : null
        this._name = validate.isString(data.name, null, validate.NOT_NULL) ? data.name : null
    }


    /**
     * Load all languages from the database
     * @param {String} languageId A valid language id (optional)
     * @returns A promise / array filled with all languages stored in the database
     */
    static readAll(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/language/read/all",
            params: defaults.NT
                ? {
                    id: {
                        value: languageId,
                        validate: "languageId"
                    }
                }
                : {
                    lang: {
                        value: languageId,
                        validate: "languageId"
                    }
                },
            returnCb: data => {
                let languages = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        languages.push(new Language(data[i]))
                    }
                }
                return languages
            }
        })
    }

    static toSelectOptions(data, supportedOnly = false) {
        let options = []
        if (validate.isArray(data), validate.NOT_NULL) {
            for (let i = 0, len = data.length; i < len; i++) {
                options.push({
                    value: data[i].id,
                    text: data[i].name
                })
            }
            if (supportedOnly === true) {
                options = options.filter(e => defaults.supportedLanguages.includes(e.value))
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