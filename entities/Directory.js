const AbstractEntity = require("./AbstractEntity");
const httpRequest = require("../lib/httpRequest");
const defaults = require("../lib/defaults")
const validate = require("../modules/validate")

module.exports = class Directory extends AbstractEntity {
    constructor() {
        super(Directory)
    }

    static list() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/directory/list",
            returnResult: true
        })
    }

    static content(dir) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/directory/list/content",
            returnResult: true,
            params: {
                dir: {
                    value: dir,
                    validate: "string",
                    required: true
                }
            }
        })

    }

    static contentLanguages(dir) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/directory/list/content/languages",
            returnResult: true,
            params: {
                dir: {
                    value: dir,
                    validate: "string",
                    required: true
                }
            }
        })        
    }

    static pdf(dir, language, filename) {
        return new Promise((resolve, reject) => {
            if (validate.isString(dir, null, validate.NOT_NULL)
                && validate.isLanguageId(language, validate.NOT_NULL)
                && validate.isString(filename, null, validate.NOT_NULL)) {
                httpRequest.request(httpRequest.GET, defaults.BASE + "/directory/content/pdf", null, {
                    dir: dir,
                    lang: language,
                    file: filename
                }, null, httpRequest.RAW)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        let message
                        switch (err.status) {
                            case 404:
                                message = "PDF not found"
                                break
                            case 400:
                                message = "Bad request, parameters missing"
                                break
                            default:
                                message = "Error reading directory content"
                                break
                        }
                        reject({
                            status: err.status,
                            message: message
                        })
                    })
            } else {
                reject({
                    ststus: 400,
                    message: "Missing or inclomlete parameters"
                })
            }
        })
    }


}