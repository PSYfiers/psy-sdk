const { Language } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC language tests", () => {

    it("read all", async () => {
        let languages = await Language.readAll("de")

        assert.isArray(languages)
        assert.notEqual(languages.length, 0)
    })
})