const { Addresstype } = require("../index")
const assert = require("chai").assert

require("./init")

describe("Account type tests", () => {
    it("read all address types", async () => {
        let types = await Addresstype.readAll()
        assert.isArray(types)
        assert.equal(types.length, 2)
    })
})