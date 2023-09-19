const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")

module.exports =class Salutation{

    static readAllLocalized(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/salutation/read/all",
            returnResult: true,
            params: {
                lang: {
                    value: languageId,
                    validate: "languageId"
                }
            }
        })
    }

    static readAll() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/salutation/read/no-locale",
            returnResult: true
        })
    }
}