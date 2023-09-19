const { ProductionList } = require("../index")
const assert = require("chai").assert

require("./init")

describe("STATIC production list tests", () => {

    it("read all projects", async () => {
        let projects = await ProductionList.allProjects("de")

        assert.isArray(projects)
        assert.notEqual(projects.length, 0)
    })

    it("read all finished projects", async () => {
        let projects = await ProductionList.finishedProjects("de")

        assert.isArray(projects)
        assert.notEqual(projects.length, 0)
        console.log(projects)
    })

    it("close a project", async () => {
        await ProductionList.closeProject(1, "406")
    })
})