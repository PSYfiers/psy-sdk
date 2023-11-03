const { Language } = require("../index")
const defaults = require("../lib/defaults")
const assert = require("chai").assert

require("./init")

describe("STATIC language tests", () => {

    it("read all", async () => {
        let languages = await Language.readAll("de")

        assert.isArray(languages)
        assert.notEqual(languages.length, 0)
    })

    it("select options",async ()=>{
        let languages = await Language.readAll("de"),
        options = Language.toSelectOptions(languages)

        assert.equal(languages.length, options.length)
        assert.isNotNull(languages[0].value)

        options = Language.toSelectOptions(languages, Language.SUPPORTED_ONLY)
        assert.equal(options.length, defaults.supportedLanguages.length)  
       
    })
})