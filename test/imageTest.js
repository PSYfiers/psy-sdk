const { Image } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC Image tests", () => {

    it("list", async () => {
        let images = await Image.list()

        assert.isArray(images)
        assert.notEqual(images.length, 0)
    })

    it("get content", async () => {
        let content = await Image.getContent("en_7_a2.jpg")

        assert.isNotNull(content)
    })
})