const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Result {
    static generatePdf(patternId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/results/generate/pdf",
            parseResult: httpRequest.RAW,
            returnResult: true,
            params: {
                id: {
                    value: patternId,
                    validate: /^[A-Za-z0-9]*-[0-9]*-[0-9]*$/,
                    required: true
                }
            }
        })
    }

    static getAvailableTemplates() {
        return new AbstractEntity().__({
            method:httpRequest.GET,
            path: "/results/templates/available",
            returnResult: true
        })
    }
}