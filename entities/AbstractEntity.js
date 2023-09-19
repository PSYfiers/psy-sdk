const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const validate = require("../modules/validate")

module.exports = class AbstractEntity {
    constructor(cl) {
        this._class = cl
    }

    _delete() {
        let descriptors = Object.getOwnPropertyDescriptors(this._class.prototype),
            descriptor,
            name
        try {
            for (let key in descriptors) {
                descriptor = descriptors[key]
                if (descriptor.get || descriptor.set)
                    name = descriptor.get ? descriptor.get.name.split(" ")[1] : descriptor.set ? descriptor.set.name.split(" ")[1] : null
                if (name) {
                    let value = this[name]
                    if (Array.isArray(value)) {
                        this["_" + name] = []
                    } else if (value && typeof value === "object") {
                        this["_" + name] = {}
                    } else if (typeof value === "boolean") {
                        this["_" + name] = false
                    } else {
                        this["_" + name] = null
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    __(options) {
        return new Promise(async (resolve, reject) => {
            try {
                let params = null,
                    validateFields = fields => {
                        let validated = true
                        for (let key in fields) {
                            switch (fields[key].validate) {
                                case "string":
                                    validated = validate.isString(fields[key].value, fields[key].maxlen, fields[key].required ? true : false)
                                    break
                                case "number":
                                    validated = validate.isNumber(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "languageId":
                                    validated = validate.isLanguageId(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "countryId":
                                    validated = validate.isNumber(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "bool":
                                    validated = validate.isBoolean(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "object":
                                    validated = validate.isObject(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "email":
                                    validated = validate.isEmail(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "path":
                                    validated = validate.isPath(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "date":
                                    validated = validate.isDate(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "currency":
                                    validated = validate.isCurrency(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "fulltype":
                                    validated = validate.isFulltype(fields[key].value, fields[key].required ? true : false)
                                    break
                                case "base64":
                                    validated = validate.isBase64(fields[key].value)
                                    break
                                case "supportedLanguaguages":
                                    validated = defaults.supportedLanguages.includes(fields[key].value)
                                    break
                                default:
                                    validated = fields[key].validate instanceof RegExp
                                        ? fields[key].validate.test(fields[key].value)
                                        : false
                            }
                            if (validated) {
                                if (!params) params = {}
                                if (typeof fields[key].value !== "undefined")
                                    params[key] = fields[key].value
                            } else {
                                reject({
                                    status: 400,
                                    message: "Missing or wrong parameter: " + key
                                })
                                return
                            }
                        }
                    }

                if (options.preExecute) {
                    console.log("pre execute script...")
                    await options.preExecute()
                    console.log("pre execute script done")
                }

                if (options.preValidate) {
                    validateFields(options.preValidate)
                }

                if (options.params) {
                    validateFields(options.params)
                }

                if (options.validator && this._validate) {
                    console.error("validate...")
                    if (!this._validate(options.create)) {
                        console.log("Validation failed")
                        reject({
                            error: 400,
                            message: "Missing or inclomplete fields"
                        })
                        return
                    }
                }

                httpRequest.request(options.method,
                    defaults.BASE + options.path,
                    options.headers,
                    params,
                    options.body ? options.body.toJson ? options.body.toJson() : options.body : null,
                    options.parseResult)
                    .then(data => {
                        if (data) {
                            if (data && options.parseResult ? this._parseJson : false) {
                                if (options.parseResult === httpRequest.JSON)
                                    this._parseJson(data)
                                resolve(options.returnResult ? data : null)
                            } else if (data && options.returnResult) {
                                resolve(data)
                            } else if (data && options.returnCb) {
                                resolve(options.returnCb(data, reject))
                            } else if (options.parseResult === null) {
                                if (options.delete) {
                                    this._delete()
                                }
                                resolve()
                            } else {
                                reject({
                                    status: 404,
                                    message: "No data found"
                                })
                            }
                        } else {
                            reject({
                                status: 404,
                                message: "No data recieved"
                            })
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            } catch (err) {
                reject(err)
            }
        })
    }

    toJson() {
        let json = {},
            descriptors = Object.getOwnPropertyDescriptors(this._class.prototype),
            descriptor,
            name
        try {

            for (let key in descriptors) {
                descriptor = descriptors[key]
                if (descriptor.get || descriptor.set)
                    name = descriptor.get ? descriptor.get.name.split(" ")[1] : descriptor.set ? descriptor.set.name.split(" ")[1] : null
                if (name) {
                    let value = this[name]
                    if (Array.isArray(value)) {
                        let arr = []
                        value.forEach(e => {
                            arr.push(e.toJson ? e.toJson() : e)
                        })
                        json[name] = arr
                    } else if (value && typeof value === "object" && value.toJson) {
                        json[name] = value.toJson()
                    } else {
                        json[name] = this[name]
                    }
                }
            }
            json = JSON.parse(JSON.stringify(json))
        } catch (err) {
            throw err
        }
        return json
    }

    toString() {
        return JSON.stringify(this.toJson())
    }
}