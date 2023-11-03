const { Addresstype } = require("../index")
const assert = require("chai").assert

require("./init")

describe("Account type tests", () => {
    it("read all address types", async () => {
        const addresstype = new Addresstype()
        let types = await addresstype.readAll()
        assert.isArray(types)
        assert.equal(types.length, 2)
    })

    describe("Static tests", () => {
        it("read all address types", async () => {
            let types = await Addresstype.readAll()
            assert.isArray(types)
            assert.equal(types.length, 2)
        })

    })
})