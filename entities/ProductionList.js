const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

module.exports = class ProductionList {

    static allProjects(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/productionlist/projects/all",
            returnResult: true,
            params: {
                lang: {
                    value: languageId,
                    validate: "languageId"
                }
            }
        })
    }

    static finishedProjects(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/productionlist/projects/finished",
            returnResult: true,
            params: {
                lang: {
                    value: languageId,
                    validate: "languageId"
                }
            }
        })
    }

    static closeProject(accountId, projectId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/productionlist/project/close",
            returnResult: false,
            parseResult: null,
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            }
        })        
    }

    static generate(accountId, projectId) {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(accountId, validate.NOT_NULL)
                && validate.isString(projectId, null, validate.NOT_NULL)) {

                httpRequest.request(httpRequest.GET, defaults.BASE + "/productionlist/generate", null, {
                    aid: accountId,
                    pid: projectId
                })
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            message: "Error generating production list"
                        })
                    })

            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing or incomplete"
                })
            }
        })
    }

    static generateResultPdf(accountId, productId, tan) {
        return ProductionList._generate(accountId, productId, tan, "result")
    }

    static generateShortResultPdf(accountId, productId, tan) {
        return ProductionList._generate(accountId, productId, tan, "short")
    }

    static generateWordcloud(accountId, productId, tan) {
        return ProductionList._generate(accountId, productId, tan, "cloud")
    }

    static generateWordcloudPdf(accountId, productId, tan) {
        return ProductionList._generate(accountId, productId, tan, "cloudpdf")
    }

    static generateJobroletPdf(accountId, productId, tan) {
        return ProductionList._generate(accountId, productId, tan, "job")
    }

    static combinedResult(accountId, productId, templateId) {
        return ProductionList._combine(accountId, productId, templateId, "result")
    }

    static combinedResultZip(accountId, productId, templateId) {
        return ProductionList._combine(accountId, productId, templateId, "resultzip")
    }

    static combinedWordcloud(accountId, productId) {
        return ProductionList._combine(accountId, productId, null, "wordcloud")
    }

    static combinedJobrole(accountId, productId) {
        return ProductionList._combine(accountId, productId, null, "jobrole")
    }

    static _generate(accountId, projectId, tan, what) {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(accountId, validate.NOT_NULL)
                && validate.isString(projectId, null, validate.NOT_NULL)
                && validâte.isString(tan, null, validate.NOT_NULL)) {

                let path
                switch (what) {
                    case "result":
                        path = "/productionlist/result"
                        break
                    case "short":
                        path = "/productionlist/shortresult"
                        break
                    case "cloud":
                        path = "/productionlist/wordcloud"
                        break
                    case "cloudpdf":
                        path = "/productionlist/wordcloudpdf"
                        break
                    case "job":
                        path = "/productionlist/jobrolepdf"
                        break
                }

                httpRequest.request(httpRequest.GET, defaults.BASE + path, null, {
                    aid: accountId,
                    pid: projectId,
                    tan: tan
                }, null, httpRequest.RAW)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            message: "Error generating and loading PDF"
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing or incomplete"
                })
            }
        })
    }

    static _combine(accountId, projectId, templateId, what) {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(accountId, validate.NOT_NULL)
                && validate.isString(projectId, null, validate.NOT_NULL)
                && validate.isString(templateId)) {

                let path
                switch (what) {
                    case "result":
                        path = "/productionlist/combine/result"
                        break
                    case "resultzip":
                        path = "/productionlist/combine/result/zip"
                        break
                    case "cloud":
                        path = "/productionlist/combine/wordcloud"
                        break
                    case "job":
                        path = "/productionlist/combine/jobrole"
                        break
                }

                httpRequest.request(httpRequest.GET, defaults.BASE + path, null, templateId ? {
                    aid: accountId,
                    pid: projectId,
                    tpl: templateId
                } : {
                    aid: accountId,
                    pid: projectId
                }, null, httpRequest.RAW)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            mesaage: "Error generating and loading combined result"
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing or incomplete"
                })
            }
        })
    }

}