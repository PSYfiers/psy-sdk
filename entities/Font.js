const AbstractEntity = require("./AbstractEntity")
const validate = require("../modules/validate")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const FormData = require("form-data")

module.exports = class Font extends AbstractEntity {
    constructor(data) {
        super(Font)
    }

    static list() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path:"/font/list",            
            returnResult: true
        })       
    }

    static upload(filename, base64FileBuffer) {
        return new Promise((resolve, reject) => {
            if (validate.isString(filename, null, validate.NOT_NULL) && !validate.isEmpty(base64FileBuffer)) {
                if (validate.isBase64(base64FileBuffer)) {
                    let formData = new FormData(),
                        headers

                    formData.append("filename", filename)
                    formData.append("file", base64FileBuffer)
                    headers = formData.getHeaders()

                    httpRequest.request(httpRequest.POST, defaults.BASE + "/font/upload2", headers, null, formData)
                        .then(() => {
                            resolve()
                        })
                        .catch(err => {
                            reject({
                                status: err.status,
                                message: "Could not upload font (fileseize 1MB max)"
                            })
                        })
                } else {
                    reject({
                        status: 406,
                        message: "Filebuffer must be BASE64 encoded"
                    })
                }
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters are missing"
                })
            }
        })
    }

    static remove(filename) {
        return new Promise((resolve, reject) => {
            if (validate.isString(filename, null, validate.NOT_NULL)) {
                httpRequest.request(httpRequest.GET, "/core/font/remove", null, { name: filename })
                    .then(() => {
                        resolve
                    })
                    .catch(err => {
                        let message
                        switch (err.status) {
                            case 400:
                                message = "Bad request, parameters missing or wrong"
                                break
                            default:
                                message = "Could not remove font"
                                break
                        }
                        reject({
                            status: err.status,
                            message: message
                        })
                    })
            } else {
                resolve({
                    status: 400,
                    message: "Please enter a filename first"
                })
            }
        })
    }
}