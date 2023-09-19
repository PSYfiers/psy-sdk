const { Country } = require("../index")
const assert = require("chai").assert

require("./init")

describe("Country tests", () => {

    it("read all countries", async () => {
        let countries = await Country.readAll("de")

        assert.isArray(countries)
        assert.equal(countries.length, 255)
    })

})