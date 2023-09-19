const { validate } = require("../index")
const assert = require("chai").assert

describe("Validation tests", () => {

    it("String validation", () => {

        const data = "A simple string"

        let result = validate.isString(data, 15, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isString(data, 10, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isString(data, null, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isString(null, null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isString(null)
        assert.equal(result, true)
    })


    it("Number validation", () => {

        let result = validate.isNumber(22, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isNumber("22", validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isNumber(22)
        assert.equal(result, true)

        result = validate.isNumber("22")
        assert.equal(result, false)

        result = validate.isNumber(null)
        assert.equal(result, true)

        result = validate.isNumber(null, validate.NOT_NULL)
        assert.equal(result, false)
    })

    it("Email validation", () => {
        const email = "armin.neische@psyfiers.ch"
        const wrongEmail = "armin.neische@psyfiers"

        let result = validate.isEmail(email, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isEmail(email)
        assert.equal(result, true)

        result = validate.isEmail(wrongEmail, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isEmail(wrongEmail)
        assert.equal(result, false)

        result = validate.isEmail(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isEmail(null)
        assert.equal(result, true)
    })

    it("BASE64 validation", () => {
        let base64 = new Buffer.alloc(3).toString("base64"),
            result = validate.isBase64(base64)
        assert.equal(result, true)

        result = validate.isBase64("bla")
        assert.equal(result, false)

        result = validate.isBase64(22)
        assert.equal(result, false)

        result = validate.isBase64(null)
        assert.equal(result, false)
    })

    it("Password strength", () => {
        let goodPassword = "N5hb&5!tsq",
            badPassword = "secret",
            result = validate.isPasswordStrength(goodPassword)
        assert.equal(result, true)

        result = validate.isPasswordStrength(badPassword)
        assert.equal(result, false)
    })

    it("Path tests", () => {
        let goodPath = "mission-team",
            badPath = "mission team",
            result = validate.isPath(goodPath, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isPath(goodPath)
        assert.equal(result, true)

        result = validate.isPath(badPath, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isPath(badPath)
        assert.equal(result, false)

        result = validate.isPath(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isPath(null)
        assert.equal(result, true)
    })

    it("Country ID tests", () => {
        let goodId = "DE",
            badId = "de",
            result = validate.isCountryId(goodId, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isCountryId(goodId)
        assert.equal(result, true)

        result = validate.isCountryId(badId, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isCountryId(badId)
        assert.equal(result, false)

        result = validate.isCountryId(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isCountryId(null)
        assert.equal(result, true)
    })

    it("Lamnguage ID tests", () => {
        let goodId = "de",
            badId = "DE",
            result = validate.isLanguageId(goodId, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isLanguageId(goodId)
        assert.equal(result, true)

        result = validate.isLanguageId(badId, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isLanguageId(badId)
        assert.equal(result, false)

        result = validate.isLanguageId(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isLanguageId(null)
        assert.equal(result, true)
    })

    it("Currency tests", () => {
        let currency = "CHF",
            noCurreny = "chf",
            result = validate.isCurrency(currency, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isCurrency(currency)
        assert.equal(result, true)

        result = validate.isCurrency(noCurreny, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isCurrency(noCurreny)
        assert.equal(result, false)

        result = validate.isCurrency(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isCurrency(null)
        assert.equal(result, true)
    })

    it("Date tests", () => {
        let date = new Date(),
            strDate = "03/20/2023",
            noDate = "Hallo",
            result = validate.isDate(date, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isDate(date)
        assert.equal(result, true)

        result = validate.isDate(strDate, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isDate(strDate)
        assert.equal(result, true)

        result = validate.isDate(noDate, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isDate(noDate)
        assert.equal(result, false)

        result = validate.isDate(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isDate(null)
        assert.equal(result, true)
    })

    it("Fulltype tests", () => {
        let fulltype = "ESFJ",
            wrongFulltype = "EFSJ",
            noFulltype = "Hallo",
            result = validate.isFulltype(fulltype, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isFulltype(fulltype)
        assert.equal(result, true)

        result = validate.isFulltype(wrongFulltype, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isFulltype(wrongFulltype)
        assert.equal(result, false)

        result = validate.isFulltype(noFulltype, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isFulltype(noFulltype)
        assert.equal(result, false)

        result = validate.isFulltype(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isFulltype(null)
        assert.equal(result, true)
    })

    it("Boolean validation", () => {

        let result = validate.isBoolean(true, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isBoolean("true", validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isBoolean(false)
        assert.equal(result, true)

        result = validate.isBoolean("false")
        assert.equal(result, false)

        result = validate.isBoolean(null)
        assert.equal(result, true)

        result = validate.isBoolean(null, validate.NOT_NULL)
        assert.equal(result, false)
    })

    it("Object validation", () => {

        let object = { id: 20 },
            noObject = "[]",
            result = validate.isObject(object, validate.NOT_NULL)
        assert.equal(result, true)


        result = validate.isObject(noObject, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isObject(object)
        assert.equal(result, true)

        result = validate.isObject(noObject)
        assert.equal(result, false)

        result = validate.isObject(null)
        assert.equal(result, true)


        result = validate.isObject(null, validate.NOT_NULL)
        assert.equal(result, false)

    })

    it("Array tests", () => {
        let arr = [],
        noArr = {},
        result = validate.isArray(arr, validate.NOT_NULL)
        assert.equal(result, true)

        result = validate.isArray(arr)
        assert.equal(result, true)

        result = validate.isArray(noArr, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isArray(noArr)
        assert.equal(result, false)

        result = validate.isArray(null, validate.NOT_NULL)
        assert.equal(result, false)

        result = validate.isArray(null)
        assert.equal(result, true)

    })

    it("isEmpty tests", () => {
        let result = validate.isEmpty(null)
        assert.equal(result, true)

        result = validate.isEmpty()
        assert.equal(result, true)

        result = validate.isEmpty({})
        assert.equal(result, false)

        result = validate.isEmpty([])
        assert.equal(result, false)

        result = validate.isEmpty("")
        assert.equal(result, true)

        result = validate.isEmpty(" ")
        assert.equal(result, false)

        result = validate.isEmpty(false)
        assert.equal(result, false)

        result = validate.isEmpty(0)
        assert.equal(result, false)

    })

})