const { Goods, GoodsGroup } = require("../index")
const assert = require("chai").assert

let goodsId

require("./init")

describe("Goods tests", () => {

    it("create goods", async () => {
        let goods = new Goods(),
            goodsGroup = new GoodsGroup(11)
        await goodsGroup.read()

        assert.equal(goodsGroup.specs.isShippingCosts, true)

        goods.goodsGroup = goodsGroup
        goods.names["de"] = "Test Ware"
        goods.names["en"] = "Test Ware"
        goods.names["fr"] = "Test Ware"
        goods.names["it"] = "Test Ware"

        await goods.create()

        assert.isNumber(goods.id)

        goodsId = goods.id
    })

    it("read goods", async () => {
        let goods = new Goods(goodsId)

        await goods.read()

        assert.equal(goods.goodsGroup, 11)
        assert.equal(goods.names["de"], "Test Ware")
        assert.equal(goods.names["fr"], "Test Ware")
        assert.equal(goods.names["it"], "Test Ware")
        assert.equal(goods.names["en"], "Test Ware")
        assert.isNotNull(goods.included)

    })

    it("update goods", async () => {
        let goods = new Goods(goodsId)

        await goods.read()

        goods.names["de"] = "Test Ware II"
        goods.names["en"] = "Test Ware II"
        goods.names["fr"] = "Test Ware II"
        goods.names["it"] = "Test Ware II"

        await goods.update()

        goods = new Goods(goodsId)

        await goods.read()
        assert.equal(goods.goodsGroup, 11)
        assert.equal(goods.names["de"], "Test Ware II")
        assert.equal(goods.names["fr"], "Test Ware II")
        assert.equal(goods.names["it"], "Test Ware II")
        assert.equal(goods.names["en"], "Test Ware II")
        assert.isNotNull(goods.included)
    })

    it("get goods group", async () => {
        let goods = new Goods(goodsId)

        await goods.read()

        let goodsGroup = await goods.getGoodsGroup()

        assert.equal(goodsGroup.id, 11)
        assert.equal(goodsGroup.specs.isShippingCosts, true)
    })

    it("copy goods", async () => {
        let goods = new Goods(goodsId),
            newId = await goods.copyTo("Kopierte Ware")

        assert.isNumber(newId)

        goods = new Goods(newId)
        await goods.delete()
    })


    it("bind, solve and read path to goods", async () => {
        const path = "new-path"
        let goods = new Goods(goodsId)

        await goods.bindPath(path)

        let boundPaths = await goods.boundPaths()

        assert.equal(boundPaths.includes(path), true)

        await goods.solvePath(path)

        boundPaths = await goods.boundPaths()

        assert.equal(boundPaths.length, 0)
    })


    it("STATIC isUsed", async () => {
        let isUsed = await Goods.isUsed(goodsId)

        assert.equal(isUsed, false)
    })

    it("STATIC availablePaths", async () => {
        let availablePaths = await Goods.availablePaths()

        assert.isArray(availablePaths)
        assert.notEqual(availablePaths.length, 0)
    })

    it("STATIC delivery address", async () => {
        let deliveryaddress = await Goods.getDeliveryAddresses(goodsId)

        assert.isArray(deliveryaddress)
        assert.equal(deliveryaddress.length, 0)
    })

    it("STATIC moderator needed", async () => {
        let moderatorNeeded = await Goods.isModeratorNeeded(goodsId)

        assert.equal(moderatorNeeded, false)
    })

    it("STATIC count goods", async () => {
        let count = await Goods.count()

        assert.isNumber(count)
        assert.notEqual(count, 0)
    })

    it("STATIC read all", async () => {
        let goods = await Goods.readAll()

        assert.isArray(goods)
        assert.notEqual(goods.length, 0)
    })

    it("STATIC list options", async () => {
        let options = await Goods.listOptions()

        assert.isArray(options)
        assert.notEqual(options.length, 0)
    })

    it("STATIC search", async () => {
        let result = await Goods.search("versand")

        assert.isArray(result)
        assert.equal(result.length, 3)
    })

    it("delete goods", async () => {

        let goods = new Goods(goodsId)
        await goods.delete()

        assert.isNull(goods.id)
    })
})