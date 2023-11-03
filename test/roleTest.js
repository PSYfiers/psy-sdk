const { Role } = require("../index")
const assert = require("chai").assert

require("./init")

describe("role tests", () => {

    it("read all", async () => {
        const role = new Role()
        let roles = await role.readAll()

        assert.isArray(roles)
        assert.notEqual(roles.length, 0)
    })

    it("STATIC read all", async () => {
        let roles = await Role.readAll()

        assert.isArray(roles)
        assert.notEqual(roles.length, 0)
    })
})