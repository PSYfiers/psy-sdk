const { User, Role, Account } = require("../index")
const assert = require("chai").assert

const userId = "armin.neische@gmail.com"

require("./init")

describe("User tests", () => {

    describe("Instance tests", () => {

        it("create", async () => {
            let user = new User(userId)
            user.firstname = "Armin"
            user.lastname = "Neische"
            user.salutation = "Herr"
            user.languageId = "de"
            user.phone = "00491234567"
            user.mobile = "004998765454"
            user.addAccount(new Account(1))
            await user.create()
        })

        it("read", async () => {
            let user = new User(userId)

            await user.read()

            assert.equal(user.firstname, "Armin")
            assert.equal(user.lastname, "Neische")
            assert.equal(user.salutation, "Herr")
            assert.equal(user.languageId, "de")
            assert.equal(user.phone, "00491234567")
            assert.equal(user.mobile, "004998765454")
            assert.isArray(user.accounts)
            assert.notEqual(user.accounts.length, 0)
            assert.equal(user.accounts[0].id, 1)
            assert.isArray(user.roles)
            assert.notEqual(user.roles.length)
            assert.equal(user.roles[0].id, "user")

        })

        it("update", async () => {
            let user = new User(userId)

            await user.read()

            user.firstname = "Hilde"
            user.lastname = "Schweizer"
            user.languageId = "fr"
            user.removeRole(Role.USER)
            user.addRole(Role.ADMINISTRATOR)
            user.removeAccount(new Account(1))
            user.addAccount(new Account(230))

            await user.update()

            user = new User(userId)

            await user.read()

            assert.equal(user.firstname, "Hilde")
            assert.equal(user.lastname, "Schweizer")
            assert.equal(user.languageId, "fr")

            let hasAdmin = user.hasRole(Role.ADMINISTRATOR),
                hasUser = user.hasRole(Role.USER),
                hasAccount230 = user.hasAccount(230),
                hasAccount1 = user.hasAccount(1)
            assert.equal(hasAdmin, true)
            assert.equal(hasUser, false)
            assert.equal(hasAccount230, true)
            assert.equal(hasAccount1, false)
        })

        it("new password", async () => {
            let user = new User(userId),
                newPassword = await user.generatePassword()

            assert.isString(newPassword)
            assert.equal(newPassword.length, 10)


        })

        it("exists", async () => {
            let user = new User(userId)

            let exists = await user.exists()

            assert.equal(exists, true)
        })

        it("linked projects", async () => {
            let user = new User("armin.neische@psyfiers.ch")
            let projects = await user.linkedProjects(new Account(1))

            assert.isArray(projects)
        })
        it("relink to project", async () => {
            let user = new User("armin.neisch@psyfiers.ch")

            await user.relinkToProject("armin.neische@psyfiers.ch", 1)
        })

        it("delete", async () => {
            let user = new User(userId)

            await user.delete()

            assert.isNull(user.id)
        })

        it("read all", async () => {
            const user = new User()
            let users = await user.readAll()

            assert.isArray(users)
            assert.notEqual(users.length, 0)

            users = await User.readAll(1)

            assert.isArray(users)
            assert.notEqual(users.length, 0)

            users = await user.readAll(new Account(1))

            assert.isArray(users)
            assert.notEqual(users.length, 0)
        })

        it("not confirmed users", async () => {
            const user = new User()
            let notConfirmed = await user.notConfirmed()

            assert.isArray(notConfirmed)
        })
    })

    describe("STATIC tests", () => {

        it("read all", async () => {
            let users = await User.readAll()

            assert.isArray(users)
            assert.notEqual(users.length, 0)

            users = await User.readAll(1)

            assert.isArray(users)
            assert.notEqual(users.length, 0)

            users = await User.readAll(new Account(1))

            assert.isArray(users)
            assert.notEqual(users.length, 0)
        })

        it("exists", async () => {
            let exists = await User.exists(new User(userId))

            assert.equal(exists, false)

            exists = await User.exists("armin.neische@psyfiers.ch")

            assert.equal(exists, true)
        })

        it("not confirmed users", async () => {
            let notConfirmed = await User.notConfirmed()

            assert.isArray(notConfirmed)
        })
    })
})