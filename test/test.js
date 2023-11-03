const {connectionStaging} = require("./global")
const Connection = require("../modules/Connection")

describe("Test TAN test",()=>{
    it("Test", async()=>{
        let tan = "m7z8wn"        
        const TanDB = connectionStaging.instance(Connection.TAN)
        let student = await TanDB.login(tan)
        
        console.log(student.toJson())
        // undefined because of creating the student from a static method.
        console.log(student.connection)

        const tanDB =connectionStaging.newInstance(Connection.TAN)
        student = await tanDB.login(tan)
        console.log(student.toJson())
        console.log(student.connection.server)

    })
})