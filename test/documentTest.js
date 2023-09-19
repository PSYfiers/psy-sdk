const { Document } = require("../index")
const assert = require("chai").assert

let docId

require("./init")

describe("Document tests", () => {

    it("create doc", async () => {
        let doc = new Document()
        doc.path["de"] = "/docs/bla.pdf"
        doc.path["fr"] = "/docs/bla.pdf"
        doc.path["en"] = "/docs/bla.pdf"
        doc.path["it"] = "/docs/bla.pdf"
        doc.goodId = 33
        doc.type = Document.TYPE_DOCUMENT
        doc.description["de"] = "Bla PDF"
        doc.description["en"] = "Bla PDF"
        doc.description["fr"] = "Bla PDF"
        doc.description["it"] = "Bla PDF"

        await doc.create()

        assert.isNumber(doc.id)

        docId = doc.id
    })


    it("read doc", async () => {
        let doc = new Document(docId)

        await doc.read()

        assert.equal(doc.goodId, 33)
        assert.equal(doc.type, Document.TYPE_DOCUMENT)
        assert.equal(doc.path["de"], "/docs/bla.pdf")
        assert.equal(doc.path["fr"], "/docs/bla.pdf")
        assert.equal(doc.path["en"], "/docs/bla.pdf")
        assert.equal(doc.path["it"], "/docs/bla.pdf")
        assert.equal(doc.description["de"], "Bla PDF")
        assert.equal(doc.description["en"], "Bla PDF")
        assert.equal(doc.description["fr"], "Bla PDF")
        assert.equal(doc.description["it"], "Bla PDF")
    })


    it("update doc", async () => {
        let doc = new Document(docId)

        await doc.read()

        doc.type = Document.TYPE_VIDEO
        doc.path["de"] = "/docs/bla.mp4"
        doc.path["en"] = "/docs/bla.mp4"
        doc.path["fr"] = "/docs/bla.mp4"
        doc.path["it"] = "/docs/bla.mp4"
        doc.description["de"] = "Bla Video"
        doc.description["en"] = "Bla Video"
        doc.description["fr"] = "Bla Video"
        doc.description["it"] = "Bla Video"

        await doc.update()

        doc = new Document(docId)
        await doc.read()
        assert.equal(doc.goodId, 33)
        assert.equal(doc.type, Document.TYPE_VIDEO)
        assert.equal(doc.path["de"], "/docs/bla.mp4")
        assert.equal(doc.path["fr"], "/docs/bla.mp4")
        assert.equal(doc.path["en"], "/docs/bla.mp4")
        assert.equal(doc.path["it"], "/docs/bla.mp4")
        assert.equal(doc.description["de"], "Bla Video")
        assert.equal(doc.description["en"], "Bla Video")
        assert.equal(doc.description["fr"], "Bla Video")
        assert.equal(doc.description["it"], "Bla Video")

    })

    it("delete doc", async () => {
        let doc = new Document(docId)

        await doc.delete()

        assert.isNull(doc.id)
    })

    it("STATIC read all docs", async () => {
        let documents = await Document.readAll(22)

        assert.isArray(documents)
        assert.notEqual(documents.length, 0)
    })

    it("STATIC cetegroized docs", async () => {
        let categories = await Document.categorized(1)

        assert.isArray(categories)
    })
})