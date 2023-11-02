const Connection = require("../modules/Connection")
const security = require("../modules/security")
const assert = require("chai").assert

describe("Connection Account Test", () => {

    it("Security.login", async () => {
        let userId = "armin.neische@psyfiers.ch",
            password = "ArminNeische60",
            connection = new Connection(Connection.SERVER_PSYFIERS_STAGING)

        let user = await security.login({
            id: userId,
            password: password
        }, connection)

        assert.equal(user.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Account instances", () => {
        const Account = require("../entities/Account")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.ACCOUNT),
            newInstance = connection.newInstance(Connection.ACCOUNT)


        assert.instanceOf(newInstance, Account)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Address instances", () => {
        const Address = require("../entities/Address")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.ADDRESS),
            newInstance = connection.newInstance(Connection.ADDRESS)

        assert.instanceOf(newInstance, Address)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Addresstype instances", () => {
        const Addresstype = require("../entities/Addresstype")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.ADDRESSTYPE),
            newInstance = connection.newInstance(Connection.ADDRESSTYPE)

        assert.instanceOf(newInstance, Addresstype)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("APIKey instances", () => {
        const APIKey = require("../entities/APIKey")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.APIKEY),
            newInstance = connection.newInstance(Connection.APIKEY)

        assert.instanceOf(newInstance, APIKey)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("BankAccount instances", () => {
        const BankAccount = require("../entities/BankAccount")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.BANKACCOUNT),
            newInstance = connection.newInstance(Connection.BANKACCOUNT)

        assert.instanceOf(newInstance, BankAccount)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Country instances", () => {
        const Country = require("../entities/Country")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.COUNTRY),
            newInstance = connection.newInstance(Connection.COUNTRY)

        assert.instanceOf(newInstance, Country)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Creditor instances", () => {
        const Creditor = require("../entities/Creditor")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.CREDITOR),
            newInstance = connection.newInstance(Connection.CREDITOR)

        assert.instanceOf(newInstance, Creditor)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Defaults instances", () => {
        const Defaults = require("../entities/Defaults")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.DEFAULTS),
            newInstance = connection.newInstance(Connection.DEFAULTS)

        assert.instanceOf(newInstance, Defaults)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Directory instances", () => {
        const Directory = require("../entities/Directory")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.DIRECTORY),
            newInstance = connection.newInstance(Connection.DIRECTORY)

        assert.instanceOf(newInstance, Directory)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Document instances", () => {
        const Document = require("../entities/Document")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.DOCUMENT),
            newInstance = connection.newInstance(Connection.DOCUMENT)

        assert.instanceOf(newInstance, Document)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Font instances", () => {
        const Font = require("../entities/Font")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.FONT),
            newInstance = connection.newInstance(Connection.FONT)

        assert.instanceOf(newInstance, Font)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Goods instances", () => {
        const Goods = require("../entities/Goods")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.GOODS),
            newInstance = connection.newInstance(Connection.GOODS)

        assert.instanceOf(newInstance, Goods)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("GoodsGroup instances", () => {
        const GoodsGroup = require("../entities/GoodsGroup")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.GOODSGROUP),
            newInstance = connection.newInstance(Connection.GOODSGROUP)

        assert.instanceOf(newInstance, GoodsGroup)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Invoice instances", () => {
        const Invoice = require("../entities/Invoice")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.INVOICE),
            newInstance = connection.newInstance(Connection.INVOICE)

        assert.instanceOf(newInstance, Invoice)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Language instances", () => {
        const Language = require("../entities/Language")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.LANGUAGE),
            newInstance = connection.newInstance(Connection.LANGUAGE)

        assert.instanceOf(newInstance, Language)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Participant instances", () => {
        const Participant = require("../entities/Participant")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.PARTICIPANT),
            newInstance = connection.newInstance(Connection.PARTICIPANT)

        assert.instanceOf(newInstance, Participant)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Project instances", () => {
        const Project = require("../entities/Project")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.PROJECT),
            newInstance = connection.newInstance(Connection.PROJECT)

        assert.instanceOf(newInstance, Project)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Role instances", () => {
        const Role = require("../entities/Role")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.ROLE),
            newInstance = connection.newInstance(Connection.ROLE)

        assert.instanceOf(newInstance, Role)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })


    it("TAN instances", () => {
        const Tan = require("../entities/Tan")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.TAN),
            newInstance = connection.newInstance(Connection.TAN)

        assert.instanceOf(newInstance, Tan)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("Template instances", () => {
        const Template = require("../entities/Template")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.TEMPLATE),
            newInstance = connection.newInstance(Connection.TEMPLATE)

        assert.instanceOf(newInstance, Template)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })

    it("User instances", () => {
        const User = require("../entities/User")
        let connection = new Connection(Connection.SERVER_PSYFIERS_STAGING),
            Instance = connection.instance(Connection.USER),
            newInstance = connection.newInstance(Connection.USER)

        assert.instanceOf(newInstance, User)
        assert.equal(Instance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
        assert.equal(newInstance.connection.server, Connection.SERVER_PSYFIERS_STAGING)
    })


})
