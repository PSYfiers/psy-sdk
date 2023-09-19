const { Tan } = require("../index")
const assert = require("chai").assert

const accountId = 230
const projectId = "459"
let tanId

require("./init")

describe("TAN tests", () => {

    describe("Instance tests", () => {

        it("create", async () => {
            let tan = new Tan()
            tan.accountId = accountId
            tan.projectId = projectId

            let tans = await tan.create(1, 10)

            assert.isArray(tans)
            assert.equal(tans.length, 1)
            assert.equal(tans[0].id.length, 10)

            tanId = tans[0].id
        })

        it("read", async () => {
            let tan = new Tan()
            tan.accountId = accountId
            tan.projectId = projectId
            tan.id = tanId

            await tan.read()

            assert.equal(tan.accountId, accountId)
            assert.equal(tan.isUnique, true)
            assert.equal(tan.active, true)

        })

        it("validated", async () => {
            let tan = new Tan()
            tan.id = tanId
            tan.accountId = accountId
            tan.projectId = projectId

            let validated = await tan.validate()
            assert.isBoolean(validated)
            assert.equal(validated, true)
        })

        it("invalidate", async () => {               
            let tan = new Tan()
            tan.id = tanId
            tan.accountId = accountId            
            tan.projectId = projectId
            
            await tan.read()

            assert.equal(tan.active, true)

            await tan.invalidate()

            assert.equal(tan.active, false)

        })

        it("is available", async () => {
            let tan = new Tan()
            tan.accountId = accountId
            tan.projectId = projectId
            tan.id = tanId

            let isAvailable = await tan.isAvailable()

            assert.equal(isAvailable, false)

        })


        it("delete", async () => {
            let tan = new Tan()
            tan.id = tanId,
                tan.projectId = projectId
            tan.accountId = accountId

            await tan.delete()

            assert.isNull(tan.id)
            assert.isNull(tan.projectId)
            assert.isNull(tan.accountId)

        })

    })

    describe("STATIC tests", () => {
        it("Create", async () => {
            let tans = await Tan.create()

            console.log(tans)
        })

        it("invalidate", async () => {
            await Tan.invalidate("8j2pm5nx5k", projectId, accountId)
        })

        it("login", async () => {
            let participant = await Tan.login("m7z8wn")

            assert.equal(participant.firstname, "Armin")
            assert.equal(participant.lastname, "Neische")
            assert.equal(participant.fulltype, "ENTP")

        })

        it("read all", async () => {
            let tans = await Tan.readAll(accountId, projectId, Tan.FILTER_INACTIVE_ONLY)

            assert.isArray(tans)
            assert.notEqual(tans.length, 0)

        })

        it("count all", async () => {
            let countA = await Tan.count(accountId, projectId),
                countB = await Tan.count(accountId, projectId, true)

            assert.isNumber(countA)
            assert.isNumber(countB)
            assert.notEqual(countA, countB)
        })

        it("validate", async () => {
            let validated = await Tan.validate("m7z8wn", projectId, accountId)
            assert.isBoolean(validated)
            assert.equal(validated, false)
            validated = await Tan.validate("e3mvah", projectId, accountId)
            assert.isBoolean(validated)
            assert.equal(validated, true)
        })

        it("available", async () => {
            let available = await Tan.available(accountId, projectId)

            assert.isArray(available)
            assert.notEqual(available.length, 0)
        })

        it("is available", async () => {
            let isAvailable = await Tan.isAvailable("9k3vdq", projectId, accountId)

            assert.equal(isAvailable, true)

            isAvailable = await Tan.isAvailable("m7z8wn", projectId, accountId)

            assert.equal(isAvailable, false)
        })

        it("tanlist PDF", async () => {
            let pdf = await Tan.getTanlistPdf(accountId, projectId)

            assert.isNotNull(pdf)
        })

    })


})