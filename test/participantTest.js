const { Participant } = require("../index")
const assert = require("chai").assert


let tan = "95x7ce",
    projectId = "459",
    accountId = 230

require("./init")

describe("Participant tests", () => {

    describe("Instance tests", () => {

        it("create", async () => {
            let options = {
                create: true,
                mode: Participant.CREATE_UPDATE_CREATE
            },
                participant = new Participant()

            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan
            participant.firstname = "Armin"
            participant.lastname = "Neische"
            participant.email = "armin.neische@gmail.com"
            participant.sex = Participant.SEX_MALE
            participant.dob = 1966
            participant.languageId = "de"
            participant.countryId = "DE"
            participant.phone = "00491600000001"
            participant.profession = "Winzer"
            participant.postcode = "78479"
            participant.fulltype = "INFJ"
            participant.e = 45
            participant.s = 26
            participant.n = 76
            participant.t = 61
            participant.f = 65
            participant.j = 95

            await participant.create(options)

            participant = new Participant()
            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan
            await participant.read()

            assert.equal(participant.firstname, "Armin")
            assert.equal(participant.lastname, "Neische")
            assert.equal(participant.email, "armin.neische@gmail.com")
            assert.equal(participant.sex, Participant.SEX_MALE)
            assert.equal(participant.dob, 1966)
            assert.equal(participant.languageId, "de")
            assert.equal(participant.countryId, "DE")
            assert.equal(participant.phone, "00491600000001")
            assert.equal(participant.profession, "Winzer")
            assert.equal(participant.postcode, "78479")
            assert.equal(participant.fulltype, "INFJ")
            assert.equal(participant.e, 45)
            assert.equal(participant.s, 26)
            assert.equal(participant.n, 76)
            assert.equal(participant.t, 61)
            assert.equal(participant.f, 65)
            assert.equal(participant.j, 95)
        })

        it("read", async () => {
            let participant = new Participant()
            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan
            await participant.read()

            assert.equal(participant.firstname, "Armin")
            assert.equal(participant.lastname, "Neische")
            assert.equal(participant.email, "armin.neische@gmail.com")
            assert.equal(participant.sex, Participant.SEX_MALE)
            assert.equal(participant.dob, 1966)
            assert.equal(participant.languageId, "de")
            assert.equal(participant.countryId, "DE")
            assert.equal(participant.phone, "00491600000001")
            assert.equal(participant.profession, "Winzer")
            assert.equal(participant.postcode, "78479")
            assert.equal(participant.fulltype, "INFJ")
            assert.equal(participant.e, 45)
            assert.equal(participant.s, 26)
            assert.equal(participant.n, 76)
            assert.equal(participant.t, 61)
            assert.equal(participant.f, 65)
            assert.equal(participant.j, 95)
        })

        it("update", async () => {
            let participant = new Participant()
            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan
            await participant.read()

            participant.firstname = "Heidi"
            participant.lastname = "Alp"
            participant.sex = Participant.SEX_FEMALE
            participant.phone = "00491600000002"

            await participant.update()

            participant = new Participant()
            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan
            await participant.read()

            assert.equal(participant.firstname, "Heidi")
            assert.equal(participant.lastname, "Alp")
            assert.equal(participant.email, "armin.neische@gmail.com")
            assert.equal(participant.sex, Participant.SEX_FEMALE)
            assert.equal(participant.dob, 1966)
            assert.equal(participant.languageId, "de")
            assert.equal(participant.countryId, "DE")
            assert.equal(participant.phone, "00491600000002")
            assert.equal(participant.profession, "Winzer")
            assert.equal(participant.postcode, "78479")
            assert.equal(participant.fulltype, "INFJ")
            assert.equal(participant.e, 45)
            assert.equal(participant.s, 26)
            assert.equal(participant.n, 76)
            assert.equal(participant.t, 61)
            assert.equal(participant.f, 65)
            assert.equal(participant.j, 95)
        })

        it("assing to another project", async () => {
            let participant = new Participant()

            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan

            await participant.assignToOtherProject(accountId, "460")

            participant = new Participant()
            participant.accountId = accountId
            participant.projectId = "460"
            participant.tan = tan

            await participant.read()

            assert.equal(participant.firstname, "Heidi")
            assert.equal(participant.lastname, "Alp")

            await participant.assignToOtherProject(accountId, projectId)
        })

        it("delete", async () => {
            let participant = new Participant()

            participant.accountId = accountId
            participant.projectId = projectId
            participant.tan = tan

            await participant.delete()

            assert.isNull(participant.accountId)
            assert.isNull(participant.projectId)
            assert.isNull(participant.tan)
        })


    })
    describe("STATIC tests", () => {
        it("count", async () => {
            let count = await Participant.count(accountId, projectId)

            assert.isNumber(count)
            assert.notEqual(count, 0)
        })

        it("read all", async () => {
            let participants = await Participant.readAll(accountId, projectId)

            assert.isArray(participants)
            assert.notEqual(participants.length, 0)
        })
    })
})