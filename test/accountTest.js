const security = require("../modules/security")
const { User, Account, Address } = require("../index")
const assert = require("chai").assert

let accountId
let userId = "armin.neische@gmail.com"

require("./init")

describe("Account tests", () => {

    describe("create/register account & user", () => {

        it("should create a new user and an new account", async () => {
            let user = new User(userId)
            user.firstname = "Armin"
            user.lastname = "Neische"
            user.salutation = "Herr"
            user.languageId = "de"

            let address = new Address()
            address.city = "Reichenau"
            address.street = "Seestrasse 64a"
            address.postcode = "78479"
            address.countryId = "DE"

            let account = new Account()
            account.companyName = "Armin`s Programmierbude (Test I)"
            account.addresses.push(address)


            accountId = (await security.register(user, account, "mission-team")).accountId

            assert.isNumber(accountId)
        })
    })

    describe("read account", () => {
        it("should be, that all fields of the account object filled before have values", async () => {
            console.log("New created account ID: " + accountId)
            let account = new Account(accountId)
            await account.read()

            assert.isNotNull(account.accountId)
            assert.isNotNull(account.companyName)
            assert.isArray(account.addresses)
            assert.equal(account.addresses.length, 1)
            assert.isNotNull(account.addresses[0].city)
            assert.isNotNull(account.addresses[0].street)
            assert.isNotNull(account.addresses.postcode)
            assert.isNotNull(account.addresses.countryId)
            assert.isBoolean(account.addresses[0].isBilling)
        })

        it("read all accounts", async () => {
            const account = new Account()
            let accounts = await account.readAll()
            assert.isArray(accounts)

            accounts = await Account.readAll(Account.SORT_BY_NAME)
            assert.isArray(accounts)

            console.log(accounts)
        })

        it("find the created account by it`s name", async () => {
            const account = new Account()
            let accounts = await account.search("Armin", 0, 1)
            assert.isArray(accounts)
            assert.equal(accounts.length, 1)
        })
    })

    describe("update account", () => {
        it("should be, that a new address is added and the company name could be changed", async () => {
            const newCompanyName = "Armin`s Programmierbude updated"
            let account = new Account(accountId)
            await account.read()

            let address = new Address()
            address.isBilling = false
            address.countryId = "DE"
            address.postcode = "78479"
            address.street = "Seestrasse 64"
            address.city = "Konstanz"

            account.addresses.push(address)
            account.companyName = newCompanyName
            await account.update()

            account = new Account(accountId)
            await account.read()
            assert.equal(account.companyName, newCompanyName)
            assert.equal(account.addresses.length, 2)
        })
    })

    describe("copy account", () => {
        let newAccountId

        it("should be a copy of an exising account created", async () => {
            const newCompanyName = "Armin`s Programmierbude cloned"

            let account = new Account(accountId),
                newAccount = await account.copy(newCompanyName)

            newAccountId = newAccount.id

            await account.read()

            assert.equal(newAccount.companyName, newCompanyName)
            assert.equal(newAccount.addresses.length, account.addresses.length)
            assert.notEqual(newAccount.id, account.id)
        })

        it("should clean up this test", async () => {
            let account = new Account(newAccountId)
            await account.delete()
            assert.isNull(account.id)
        })

    })

    describe("copy /remove client specs from goods", () => {
        let goodId = 33 //WSK-Test

        it("shold be a new object in account specs", async () => {
            let account = new Account(accountId)
            await account.copyClientSpecs(goodId)
            await account.read()

            assert.isObject(account.specs)
            assert.isObject(account.specs.client)

        })
        it("should be that the new client object is deleted", async () => {
            let account = new Account(accountId)
            await account.deleteClientSpecs()
            await account.read()

            assert.isObject(account.specs)
            assert.equal(typeof account.specs.client, "undefined")
        })
    })

    describe("STATIC tests", async () => {
        it("read all accounts", async () => {
            let accounts = await Account.readAll()
            assert.isArray(accounts)

            accounts = await Account.readAll(Account.SORT_BY_NAME)
            assert.isArray(accounts)

            console.log(accounts)
        })

        it("list client specs", async () => {
            const languageId = "de"
            let specs = await Account.listClientSpecs(languageId)
            assert.isArray(specs)
            if (specs.length) {
                assert.isNumber(specs[0].id)
                assert.isString(specs[0].name)
            }
        })

        it("account should exists", async () => {
            assert.equal(await Account.exists(accountId), true)
        })

        it("count accounts", async () => {
            let count = await Account.count()
            assert.isNumber(count)
        })

        it("find the created account by it`s name", async () => {
            let accounts = await Account.search("Armin", 0, 1)
            assert.isArray(accounts)
            assert.equal(accounts.length, 1)
        })
    })



    describe("deactive / delete account", () => {

        it("should be, that the account is deactivated", async () => {
            let account = new Account(accountId)
            await account.read()


            assert.equal(account.active, true)
            await account.deactivate()
            assert.equal(account.active, false)

            account = new Account(accountId)
            await account.read()
            assert.equal(account.active, false)

        })

        it("cleanup all objects in database / delete account", async () => {
            let account = new Account(accountId),
                user = new User(userId)

            await account.delete()
            assert.isNull(account.id)

            await user.delete()
        })
    })


})