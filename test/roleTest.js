const { Role } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC role tests", () => {

    it("read all", async () => {
        let roles = await Role.readAll()

        assert.isArray(roles)
        assert.notEqual(roles.length, 0)
    })
})