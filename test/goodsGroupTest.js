const { GoodsGroup } = require("../index")
const assert = require("chai").assert

let goodGroupId

require("./init")

describe("Goods group tests", () => {
    it("create a new goods group", async () => {
        let group = new GoodsGroup()
        group.names["de"] = "Neue Warengruppe"
        group.names["en"] = "Neue Warengruppe"
        group.names["fr"] = "Neue Warengruppe"
        group.names["it"] = "Neue Warengruppe"

        await group.create()

        assert.isNumber(group.id)

        goodGroupId = group.id
    })

    it("read goods group", async () => {
        let group = new GoodsGroup(goodGroupId)
        await group.read()

        assert.equal(group.names["de"], "Neue Warengruppe")
    })

    it("update goods group", async () => {
        let group = new GoodsGroup(goodGroupId)
        await group.read()

        group.descriptions["de"] = "Meine Warengruppe"
        group.descriptions["en"] = "Meine Warengruppe"
        group.descriptions["fr"] = "Meine Warengruppe"
        group.descriptions["it"] = "Meine Warengruppe"

        await group.update()

        group = new GoodsGroup(goodGroupId)
        await group.read()

        assert.equal(group.descriptions["de"], "Meine Warengruppe")
    })

    it("delete goods group", async () => {
        let group = new GoodsGroup(goodGroupId)
        await group.delete()

        assert.isNull(group.id)
    })

    it("read all", async () => {
        const goodsGroup = new GoodsGroup()
        let groups = await goodsGroup.readAll()

        assert.isArray(groups)
        assert.notEqual(groups.length, 0)
    })


    it("STATIC read all", async () => {
        let groups = await GoodsGroup.readAll()

        assert.isArray(groups)
        assert.notEqual(groups.length, 0)
    })

    it("STATIC has shipping costs", async () => {
        let hasShippingCosts = await GoodsGroup.hasShippingcosts()

        assert.isBoolean(hasShippingCosts)
        assert.equal(hasShippingCosts, true)
    })

    it("STATIC who has shipping costs defined", async () => {
        let id = await GoodsGroup.whoHasShippingcosts()

        assert.isNumber(id)
        assert.equal(id, 11)
    })

})