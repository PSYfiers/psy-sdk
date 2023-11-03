const { connectionStaging, connectionProduction } = require("./global")

const Connection = require("../modules/Connection")

async function test() {
    const TanDB = connectionStaging.newInstance(Connection.TAN)
    let student = await TanDB.login("m7z8wn")

    console.log(student)
}

test()
