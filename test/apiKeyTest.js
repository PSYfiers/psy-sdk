const { APIKey } = require("../index")
const assert = require("chai").assert

require("./init")

describe("APIKey tests", () => {

    let apiKeyId

    it("create API key", async () => {
        let key = new APIKey()
        key.accountId = 1
        key.name = "Testkey"
        key.description = "A Unit-Test Key"
        await key.create()

        assert.isString(key.id)
        assert.isString(key.secret)

        apiKeyId = key.id
    })

    it("read key", async () => {
        let key = new APIKey(apiKeyId)
        await key.read()

        assert.equal(key.name, "Testkey")
    })

    it("update key", async () => {
        let key = new APIKey(apiKeyId)
        await key.read()

        key.name = "Testkey II"

        await key.update()

        key = new APIKey(apiKeyId)
        await key.read()

        assert.equal(key.name, "Testkey II")
    })

    it("delete key", async () => {
        let key = new APIKey(apiKeyId)
        await key.delete()

        assert.isNull(key.id)
    })
})
