const { Invoice } = require("../index")
const assert = require("chai").assert

const id = "RF022021100000000540"

require("./init")

describe("STATIC Invoice tests", () => {
    it("get PDF", async () => {
        let pdf = await Invoice.getPdf(id)

        assert.isNotNull(pdf)
    })

    it("get unpaid", async () => {
        let unpaid = await Invoice.getUnpaid()

        assert.isArray(unpaid)
    })


    it("mark paid", async () => {
        await Invoice.markAsPaid(id)
    })

    it("read all", async () => {
        let invoices = await Invoice.readAll(1)

        assert.isArray(invoices)
        assert.notEqual(invoices.length, 0)
    })

    it("new creditor reference", async () => {
        let ref = await Invoice.newCreditorReference()

        assert.isString(ref)
        assert.equal(ref.length, 20)
    })


})