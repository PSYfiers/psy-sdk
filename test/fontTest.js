const { Font } = require("../index")
const assert = require("chai").assert

require("./init")

describe("Font tests", () => {

    it("STATIC List", async () => {
        let fonts = await Font.list()

        assert.isArray(fonts)
        assert.notEqual(fonts.length, 0)
    })
})