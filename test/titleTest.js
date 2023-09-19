const { Title } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC Title tests", () => {

    it("read all", async () => {
        let titles = await Title.readAll()

        assert.isArray(titles)
        assert.notEqual(titles.length, 0)
    })
})