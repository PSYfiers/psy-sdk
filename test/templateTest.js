const { APIKey } = require("../index")
const Template = require("../entities/Template")
const assert = require("chai").assert

const id = "TEST-TEMPLATE"

require("./init")

describe("Template tests", () => {

    describe("Instance tests", () => {
        it("create", async () => {
            let template = new Template(id)
            template.conf = {
                "lang": null,
                "texts": [
                    {
                        "x": 83,
                        "y": 675,
                        "font": "arial.ttf",
                        "page": 1,
                        "size": 24,
                        "text": "$firstname $lastname",
                        "align": "LEFT",
                        "color": "999999",
                        "weight": "NORMAL",
                        "rotation": 0
                    }
                ],
                "images": [
                    {
                        "ref": "Im0",
                        "page": 1,
                        "path": "wordcloud",
                        "params": [
                            "default"
                        ]
                    }
                ],
                "result": {
                    "e": null,
                    "f": null,
                    "j": null,
                    "n": null,
                    "s": null,
                    "t": null
                },
                "subdir": "psyprod",
                "template": "wordclouda4"
            }

            await template.create()
        })

        it("read", async () => {
            let template = new Template(id)
            await template.read()

            assert.equal(template.conf.subdir, "psyprod")
        })

        it("update", async () => {
            let template = new Template(id)
            await template.read()

            template.conf.subdir = "psytest"

            await template.update()

            template = new Template(id)
            await template.read()

            assert.equal(template.conf.subdir, "psytest")
        })

        it("delete", async () => {
            let template = new Template(id)
            await template.delete()

            assert.isNull(template.id)
        })
    })

    describe("STATIC tests", () => {
        it("STATIC list IDs", async () => {
            let ids = await Template.listIds()

            assert.isArray(ids)
            assert.notEqual(ids.length, 0)
        })

        it("STATIC list subdirs", async () => {
            let subdirs = await Template.listSubdirs()

            assert.isArray(subdirs)
            assert.notEqual(subdirs.length, 0)
        })

        it("STATIC get image injection points", async () => {
            let type = "entj",
                subdir = "wsfma",
                languageId = "fr",
                page = 1,
                params = "WSFMA"

            let injectionPoints = await Template.getImageInjectionpoints(type, subdir, languageId, page, params)

            assert.isArray(injectionPoints)
            assert.notEqual(injectionPoints.length, 0)
        })

        it("STATIC used fonts", async () => {
            let usedFonts = await Template.usedFonts()

            assert.isArray(usedFonts)
            assert.notEqual(usedFonts.length, 0)
        })
    })
})