const Defaults = require("../lib/ConnectionDefaults")

module.exports = class Connection {

    constructor(server) {
        if (server) {
            this._server = server
        }

        if (this._server) {
            this._defaults = new Defaults()
            this._defaults.HOSTNAME = this.server
        }
    }

    static get SERVER_PSYFIERS_DEVELOP() {
        return "develop.psyfiers.ch"
    }

    static get SERVER_PSYFIERS_SERVICE() {
        return "service.psyfiers.ch"
    }

    static get SERVER_PSYFIERS_STAGING() {
        return "staging.psyfiers.ch"
    }

    static get SERVER_SSK_PRODUCTION() {
        return "prod.swiss-skills.ch"
    }

    static get SERVER_SSK_STAGING() {
        return "staging.swiss-skills.ch"
    }

    static get SERVER_PSYFIERS_CC1() {
        return "cc1.psydiers.ch"
    }

    static get SERVER_PSYFIERS_CC2() {
        return "cc2.psydiers.ch"
    }

    static get ACCOUNT() {
        return "Account"
    }

    static get ADDRESS() {
        return "Address"
    }

    static get ADDRESSTYPE() {
        return "Addresstype"
    }

    static get APIKEY() {
        return "APIKey"
    }

    static get BANKACCOUNT() {
        return "BankAccount"
    }

    static get COUNTRY() {
        return "Country"
    }

    static get CREDITOR() {
        return "Creditor"
    }

    static get DEFAULTS() {
        return "Defaults"
    }

    static get DIRECTORY() {
        return "Directory"
    }

    static get DOCUMENT() {
        return "Document"
    }

    static get FONT() {
        return "Font"
    }

    static get GOODS() {
        return "Goods"
    }

    static get GOODSGROUP() {
        return "GoodsGroup"
    }

    static get INVOICE() {
        return "Invoice"
    }

    static get LANGUAGE() {
        return "Language"
    }

    static get PARTICIPANT() {
        return "Participant"
    }

    static get PROJECT() {
        return "Project"
    }

    static get ROLE() {
        return "Role"
    }

    static get TAN() {
        return "TAN"
    }

    static get TEMPLATE() {
        return "Template"
    }

    static get USER() {
        return "User"
    }

    get server() {
        return this._server
    }

    get defaults() {
        return this._defaults
    }

    newInstance(classname, param) {
        return this.__instance(true, classname, param)
    }

    instance(classname) {
        return this.__instance(false, classname, null)
    }

    __instance(instanciate, classname, params = null) {
        switch (classname) {
            case Connection.ACCOUNT:
                return this.__setup(instanciate, require("../entities/Account"), params)
            case Connection.ADDRESS:
                return this.__setup(instanciate, require("../entities/Address"), params)
            case Connection.ADDRESSTYPE:
                return this.__setup(instanciate, require("../entities/Addresstype"), params)
            case Connection.APIKEY:
                return this.__setup(instanciate, require("../entities/APIKey", params))
            case Connection.BANKACCOUNT:
                return this.__setup(instanciate, require("../entities/BankAccount", params))
            case Connection.COUNTRY:
                return this.__setup(instanciate, require("../entities/Country", params))
            case Connection.CREDITOR:
                return this.__setup(instanciate, require("../entities/Creditor", params))
            case Connection.DEFAULTS:
                return this.__setup(instanciate, require("../entities/Defaults", params))
            case Connection.DIRECTORY:
                return this.__setup(instanciate, require("../entities/Directory", params))
            case Connection.DOCUMENT:
                return this.__setup(instanciate, require("../entities/Document", params))
            case Connection.FONT:
                return this.__setup(instanciate, require("../entities/Font", params))
            case Connection.GOODS:
                return this.__setup(instanciate, require("../entities/Goods", params))
            case Connection.GOODSGROUP:
                return this.__setup(instanciate, require("../entities/GoodsGroup", params))
            case Connection.INVOICE:
                return this.__setup(instanciate, require("../entities/Invoice", params))
            case Connection.LANGUAGE:
                return this.__setup(instanciate, require("../entities/Language", params))
            case Connection.PARTICIPANT:
                return this.__setup(instanciate, require("../entities/Participant", params))
            case Connection.PROJECT:
                return this.__setup(instanciate, require("../entities/Project", params))
            case Connection.ROLE:
                return this.__setup(instanciate, require("../entities/Role", params))
            case Connection.TAN:
                return this.__setup(instanciate, require("../entities/Tan", params))
            case Connection.TEMPLATE:
                return this.__setup(instanciate, require("../entities/Template", params))
            case Connection.USER:
                return this.__setup(instanciate, require("../entities/User", params))
        }
    }

    __setup(instanciate, _class, param) {
        if (instanciate) {
            let instance = new _class(param)
            instance.__connection = this
            return instance
        } else {
            _class.__connection = this
            return _class
        }
    }
}