const querystring = require("../modules/querystring")
const assert = require("chai").assert

describe("querystring tests", () => {
    it("encode", () => {
        let object = {
            firstnamename: "Armin",
            lastname: "Neische",
            rover: [
                1, 2, 3
            ],
            address: {
                street: "Seestrasse",
                number: "64a",
                city: {
                    name: "Reichenau",
                    zip:[78479, 78579]
                }
            }
        }

        console.log(querystring.encode(object))
    })
})