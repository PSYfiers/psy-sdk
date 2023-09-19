const { Result } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC Result tests", () => {
    it("generate PDF", async () => {
        let pdf = await Result.generatePdf("m7z8wn-230-459")

        assert.isNotNull(pdf)
    })

    it("available templates", async () => {
        let templates = await Result.getAvailableTemplates()

        assert.isArray(templates)
        assert.notEqual(templates.length, 0)
    })

})