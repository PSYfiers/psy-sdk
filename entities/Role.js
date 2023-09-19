const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Role extends AbstractEntity {
    constructor(data) {
        super(Role)
        if (data) {
            if (validate.isObject(data)) {
                this._parseJson(data)
            } else if (validate.isString(data) && Role.AVAILABLE_ROLES.includes(data)) {
                this._id = data
            }
        }
    }

    static get AVAILABLE_ROLES() {
        return ["guest", "moderator", "user", "developer", "administrator"]
    }

    static get GUEST() {
        return "guest"
    }

    static get MODERATOR() {
        return "moderator"
    }

    static get USER() {
        return "user"
    }

    static get DEVELOPER() {
        return "developer"
    }

    static get ADMINISTRATOR() {
        return "administrator"
    }

    set id(id) {
        if (validate.isString(id) && Role.AVAILABLE_ROLES.includes(id))
            this._id = id
        else
            throw new Error("Parameter must be of type string or is not a role ID")
    }
    get id() {
        return this._id
    }

    set description(description) {
        if (validate.isString(description))
            this._description = description
        else
            throw new Error("Parameter must be of type string")
    }

    get description() {
        return this._description
    }

    set rank(rank) {
        if (validate.isNumber(rank))
            this._rank = rank
        else
            throw new Error("Parameter must be of type number")
    }
    get rank() {
        return this._rank
    }

    _parseJson(data) {
        this._id = validate.isString(data.id, null, validate.NOT_NULL) ? data.id : null
        this._description = validate.isString(data.description, null, validate.NOT_NULL) ? data.description : null
        this._rank = validate.isNumber(data.rank, validate.NOT_NULL) ? data.rank : null
    }

    static readAll(languageId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/role/read/all",
            returnCb: data => {
                let roles = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        roles.push(new Role(data[i]))
                    }
                }
                return roles
            }
        })
    }
}