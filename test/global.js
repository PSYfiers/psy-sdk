const Connection = require("../modules/Connection")

module.exports = {
    connectionSSK : new Connection(Connection.SERVER_SSK_PRODUCTION),
    connectionStaging: new Connection(Connection.SERVER_PSYFIERS_STAGING)
}