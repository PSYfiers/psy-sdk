const { Directory } = require("../index")
const assert = require("chai").assert

const dir = "mfwsf"
const file = "enfj_MF_WSF.pdf"

require("./init")

describe("STATIC directory tests", () => {
    it("list directory names", async () => {

        let dirs = await Directory.list()

        assert.isArray(dirs)
        assert.equal(dirs.includes(dir), true)

    })

    it("list directory content", async () => {

        let content = await Directory.content(dir)

        assert.isArray(content)
        assert.equal(content.includes(file), true)
    })

    it("list content language", async () => {

        let languages = await Directory.contentLanguages(dir)

        assert.isArray(languages)
        assert.equal(languages.includes("de"), true)
        assert.equal(languages.includes("fr"), true)
        assert.equal(languages.includes("en"), true)
        assert.equal(languages.includes("it"), true)
    })

    it("download PDF", async () => {

        let pdf = await Directory.pdf(dir, "de", file)

        assert.isNotEmpty(pdf)
    })
})
