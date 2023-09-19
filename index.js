let defaults = require("./lib/defaults");

module.exports = {
    init(options) {
        if (typeof options.hostname !== "undefined") defaults.HOSTNAME = options.hostname
        if (typeof options.protocol !== "undefined") defaults.PROTOCOL = options.protocol
        if (typeof options.port !== "undefined") defaults.PORT = options.port
        if (typeof options.base !== "undefined") defaults.BASE = options.base
        if (typeof options.nt === "boolean") defaults.NT = options.nt
        if (typeof options.debug === "boolean") defaults.DEBUG = options.debug
        if (typeof options.showErrors === "boolean") defaults.SHOWERRORS = options.showErrors
    },
    defaults: {
        HOSTNAME: defaults.HOSTNAME,
        PORT: defaults.PORT,
        DEBUG: defaults.DEBUG,
        SHOWERRORS: defaults.SHOWERRORS
    },
    security: require("./modules/security"),
    Account: require("./entities/Account"),
    Address: require("./entities/Address"),
    Addresstype: require("./entities/Addresstype"),
    APIKey: require("./entities/APIKey"),
    BankAccount: require("./entities/BankAccount"),
    Country: require("./entities/Country"),
    Creditor: require("./entities/Creditor"),
    Defaults: require("./entities/Defaults"),
    Directory: require("./entities/Directory"),
    Document: require("./entities/Document"),
    Font: require("./entities/Font"),
    Goods: require("./entities/Goods"),
    GoodsGroup: require("./entities/GoodsGroup"),
    Image: require("./entities/Image"),
    Invoice: require("./entities/Invoice"),
    Language: require("./entities/Language"),
    Participant: require("./entities/Participant"),
    ProductionList: require("./entities/ProductionList"),
    Project: require("./entities/Project"),
    Result: require("./entities/Result"),
    Role: require("./entities/Role"),
    Salutation: require("./entities/Salutation"),
    Tan: require("./entities/Tan"),
    Title: require("./entities/Title"),
    User: require("./entities/User")
}
