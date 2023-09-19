const { Salutation } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC salutation tests", () => {
    it("read all localized", async () => {
        let salutations = await Salutation.readAllLocalized("en")

        assert.isArray(salutations)
        assert.notEqual(salutations.length, 0)
    })

    it("read all", async () => {
        let salutations = await Salutation.readAll()

        assert.isObject(salutations)
    })
})