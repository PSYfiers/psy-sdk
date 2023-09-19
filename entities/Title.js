const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")

module.exports = class Title {
    static readAll(langugeId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/title/read/all",
            returnResult: true,
            params: {
                lang: {
                    value: langugeId,
                    validate: "languageId"                    
                }
            }
        })
    }
}