const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

module.exports = class Image {

    static list() {       
        return new Promise((resolve, reject) => {
            httpRequest.request(httpRequest.GET, defaults.BASE + "/img/list")
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject({
                        status: err.status,
                        message: "Error listing images"
                    })
                })
        })
    }

    static upload(fileBuffer) {
        return new Promise((resolve, reject) => {
            if (fileBuffer && Buffer.isBuffer(fileBuffer)) {
                reject({
                    status: 400,
                    message: "Not yet implemented"
                })
            } else {
                reject({
                    status: 400,
                    message: "Missing parameter or parameter is not a Buffer"
                })
            }
        })
    }


    static delete(fileName) {
        return new Promise((resolve, reject) => {
            if (validate.isString(fileName, null, validate.NOT_NULL)) {
                this.list().then(fileNames => {
                    if (fileNames.includes(fileName)) {
                        httpRequest.request(httpRequest.GET, defaults + "/img/delete", null, { name: fileName })
                            .then(() => {
                                resolve()
                            })
                            .catch(err => {
                                reject({
                                    status: err.status,
                                    message: "Error deleting image"
                                })
                            })
                    } else {
                        reject({
                            status: 404,
                            message: "Filename not found"
                        })
                    }
                })
            } else {
                reject({
                    status: 400,
                    message: "Please enter a file name"
                })
            }
        })
    }


    static getContent(fileName) {
        return new Promise((resolve, reject) => {
            if (validate.isString(fileName, null, validate.NOT_NULL)) {
                this.list().then(fileNames => {
                    if (fileNames.includes(fileName)) {
                        httpRequest.request(httpRequest.GET, defaults.BASE + "/img/content", null, { name: fileName }, null, httpRequest.RAW)
                            .then(data => {
                                resolve(data)
                            })
                            .catch(err => {
                                reject({
                                    status: err.status,
                                    message: "Error reading image content"
                                })
                            })
                    } else {
                        reject({
                            status: 404,
                            message: "Filename not found"
                        })
                    }
                })
            } else {
                reject({
                    status: 400,
                    message: "Please enter a file name"
                })
            }
        })
    }

}