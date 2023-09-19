const { Creditor, BankAccount } = require("../index")
const assert = require("chai").assert

require("./init")

describe("Creditor tests", () => {

    let creditorId

    it("create creditor", async () => {

        let bankAccount = new BankAccount()
        bankAccount.iban = "DE234500000001234576"
        bankAccount.bic = "SOLADECS676"

        let creditor = new Creditor()
        creditor.uid = "DE672341"
        creditor.name = "Armin Neische"
        creditor.street = "Seestrasse"
        creditor.number = "64a"
        creditor.postcode = "78479"
        creditor.city = "Reichenau"
        creditor.country = "DE"
        creditor.bankAccounts.push(bankAccount)

        await creditor.create()

        assert.isNotNull(creditor.id)

        creditorId = creditor.id
    })


    it("read creditor", async () => {

        let creditor = new Creditor(creditorId)

        await creditor.read()

        assert.equal(creditor.uid, "DE672341")
        assert.equal(creditor.name, "Armin Neische")
        assert.equal(creditor.street, "Seestrasse")
        assert.equal(creditor.number, "64a")
        assert.equal(creditor.postcode, "78479")
        assert.equal(creditor.city, "Reichenau")
        assert.equal(creditor.country.id, "DE")
        assert.isArray(creditor.bankAccounts)
        assert.equal(creditor.bankAccounts[0].iban, "DE234500000001234576")
        assert.equal(creditor.bankAccounts[0].bic, "SOLADECS676")
    })

    it("update creditor", async () => {

        let creditor = new Creditor(creditorId)
        await creditor.read()

        creditor.name = "Armin"
        creditor.bankAccounts[0].bic = "ERASTES1223"

        await creditor.update()

        creditor = new Creditor(creditorId)
        await creditor.read()

        assert.equal(creditor.name, "Armin")
        assert.isArray(creditor.bankAccounts)
        assert.equal(creditor.bankAccounts[0].bic, "ERASTES1223")
    })

    it("delete creditor", async () => {

        let creditor = new Creditor(creditorId)
        await creditor.delete()

        assert.isNull(creditor.id)
    })

    it("STATIC readAll", async () => {

        let creditors = await Creditor.readAll()

        assert.isArray(creditors)
        assert.equal(creditors.length, 1)

    })

})