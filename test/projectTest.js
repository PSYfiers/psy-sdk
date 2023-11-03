const { Project } = require("../index")
const assert = require("chai").assert

const accountId = 230
const productId = 18
let projectId

require("./init")

describe("Project tests", () => {

    it("create", async () => {
        let project = new Project()
        project.accountId = accountId
        project.productId = productId

        await project.create("Test driven created", "armin.neische@psyfiers.ch", "de", false)

        assert.isNotNull(project.id)
        projectId = project.id
    })

    it("read", async () => {
        let project = new Project()
        project.accountId = accountId
        project.id = projectId

        await project.read()

        assert.equal(project.productId, productId)
        assert.equal(project.specs.moderator, "armin.neische@psyfiers.ch")
        assert.equal(project.specs.description, "Test driven created")
        assert.equal(project.specs.language, "de")
        assert.equal(project.specs.notTanProtected, true)
    })

    it("update specs", async () => {
        let project = new Project()
        project.accountId = accountId
        project.id = projectId

        await project.read()
        assert.equal(project.specs.moderator, "armin.neische@psyfiers.ch")
        assert.equal(project.specs.description, "Test driven created")
        assert.equal(project.specs.language, "de")
        assert.equal(project.specs.notTanProtected, true)

        project.specs.moderator = "armin.neische@gmail.com"
        project.specs.description = "Test driven changed"
        project.specs.language = "en"
        project.specs.notTanProtected = false

        await project.updateSpecs()

        project = new Project()
        project.accountId = accountId
        project.id = projectId

        await project.read()
        assert.equal(project.specs.moderator, "armin.neische@gmail.com")
        assert.equal(project.specs.description, "Test driven changed")
        assert.equal(project.specs.language, "en")
        assert.equal(project.specs.notTanProtected, false)
    })

    it("read all", async () => {
        const project = new Project()
        let projects = await project.readAll(accountId)

        assert.isArray(projects)
        assert.notEqual(projects.length, 0)
    })

    it("STATIC count tans", async () => {
        let count = await Project.countTans(accountId, projectId)

        assert.isNumber(count)
    })

    it("STATIC increase TAN", async () => {
        let increase = 1
        let countBefore = await Project.countTans(accountId, projectId)

        await Project.increaseTan(accountId, projectId, increase)

        let countAfter = await Project.countTans(accountId, projectId)

        assert.equal(countBefore + increase, countAfter)

    })

    it("STATIC toggle online state", async () => {
        let project = new Project()
        project.id = projectId
        project.accountId = accountId

        await project.read()

        let onlineBefore = typeof project.specs.online === "undefined" ? true : project.specs.online
        await Project.toggleOnline(accountId, projectId)

        await project.read()
        let onlineAfter = project.specs.online

        assert.equal(onlineBefore, !onlineAfter)
    })

    it("STATIC check VIP URL", async () => {
        let project = new Project()
        project.id = projectId
        project.accountId = accountId

        await project.read()

        let url = project.specs.url
        let info = await Project.checkVipURL(url)

        assert.equal(info.projectId, projectId)
        assert.equal(info.accountId, accountId)
    })

    it("STATIC read all", async () => {
        let projects = await Project.readAll(accountId)

        assert.isArray(projects)
        assert.notEqual(projects.length, 0)
    })

    it("STATIC excel data", async () => {
        let data = await Project.getExcelData(accountId, projectId)
        assert.isArray(data)
    })

    it("STATIC list excel list defs", async () => {
        let defs = await Project.listExcelDefinitions()

        assert.isArray(defs)
    })

    it("STATIC read excel template def", async () => {
        let def = await Project.readExcelTemplateDefinition("staging-tanlistdef.json")

        assert.isObject(def)
        assert.equal(def.templates, "staging")
    })

    it("STATIC get tanlist PDF", async () => {
        let pdf = await Project.getTanlistPdf(accountId, projectId)

        assert.isNotNull(pdf)
    })

    it("delete / TEST ONLY!", async () => {
        let project = new Project()
        project.accountId = accountId
        project.id = projectId

        await project.__delete()
    })


})