const Connection = require("../modules/Connection")
let connectionProduction = new Connection(Connection.SERVER_SSK_PRODUCTION)
let connectionStaging = new Connection(Connection.SERVER_PSYFIERS_STAGING)

exports.connectionProduction = connectionProduction
exports.connectionStaging = connectionStaging
