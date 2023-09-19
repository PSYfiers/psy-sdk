const AbstractEntity = require("./AbstractEntity")
const Account = require("./Account")
const Project = require("./Project")
const Role = require("./Role")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

module.exports = class User extends AbstractEntity {

    constructor(data) {
        super(User)
        this._roles = []
        this._accounts = []
        if (data) {
            if (typeof data === "object") {
                this._parseJson(data)
            } else if (validate.isEmail(data)) {
                this._id = data
            }
        }
    }
    set id(id) {
        if (validate.isEmail(id))
            this._id = id
        else
            throw new Error("Parameter must be of type string")
    }

    get id() {
        return this._id
    }

    set salutation(salutation) {
        if (validate.isString(salutation))
            this._salutation = salutation
        else
            throw new Error("Parameter must be of type string")
    }

    get salutation() {
        return this._salutation
    }

    set firstname(firstname) {
        if (validate.isString(firstname))
            this._firstname = firstname
        else
            throw new Error("Parameter must be of type string")
    }

    get firstname() {
        return this._firstname
    }

    set lastname(lastname) {
        if (validate.isString(lastname))
            this._lastname = lastname
        else
            throw new Error("Parameter must be of type string")
    }

    get lastname() {
        return this._lastname
    }

    set languageId(languageId) {
        if (validate.isLanguageId(languageId))
            this._languageId = languageId
        else
            throw new Error("Parameter is not a valid language ID")

    }

    get languageId() {
        return this._languageId
    }

    set phone(phone) {
        if (validate.isString(phone))
            this._phone = phone
        else
            throw new Error("Parameter must be of type string")
    }

    get phone() {
        return this._phone
    }

    set mobile(mobile) {
        if (validate.isString(mobile))
            this._mobile = mobile
        else
            throw new Error("Parameter must be of type string")
    }

    get mobile() {
        return this._mobile
    }

    get specs() {
        return this._specs
    }

    get roles() {
        return this._roles
    }

    get accounts() {
        return this._accounts
    }

    set active(active) {
        if (validate.isBoolean(active))
            this._active = active
        else
            throw new Error("Parameter must be of type boolean")
    }

    get active() {
        return this._active
    }

    set verified(verified) {
        if (validate.isBoolean(verified))
            this._verified = verified
        else
            throw new Error("Parameter must be of type boolean")
    }

    get verified() {
        return this._verified
    }

    get created() {
        return this._created
    }

    _parseJson(data) {
        this._id = validate.isEmail(data.id, validate.NOT_NULL) ? data.id : null
        this._salutation = validate.isString(data.salutation, null, validate.NOT_NULL) ? data.salutation : null
        this._firstname = validate.isString(data.firstname, null, validate.NOT_NULL) ? data.firstname : null
        this._lastname = validate.isString(data.lastname, null, validate.NOT_NULL) ? data.lastname : null
        this._languageId = validate.isLanguageId(data.languageId, validate.NOT_NULL) ? data.languageId : null
        this._phone = validate.isString(data.phone, null, validate.NOT_NULL) ? data.phone : null
        this._mobile = validate.isString(data.mobile, null, validate.NOT_NULL) ? data.mobile : null
        this._specs = validate.isObject(data.specs, validate.NOT_NULL) ? data.specs : {}
        this._roles = []
        if (data.roles && Array.isArray(data.roles) && data.roles.length) {
            for (let i = 0, len = data.roles.length; i < len; i++) {
                this._roles.push(new Role(data.roles[i]))
            }
        }
        this._accounts = []
        if (data.accounts && Array.isArray(data.accounts) && data.accounts.length) {
            for (let i = 0, len = data.accounts.length; i < len; i++) {
                this._accounts.push(new Account(data.accounts[i]))
            }
        }
        this._active = validate.isBoolean(data.active, validate.NOT_NULL) ? data.active : true
        this._verified = validate.isBoolean(data.verified, validate.NOT_NULL) ? data.verified : false
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : new Date()
    }

    _validate() {
        if (validate.isEmpty(this._id)) return false
        if (validate.isEmpty(this._languageId)) {
            return false
        } else {
            if (!defaults.supportedLanguages.includes(this._languageId)) return false
        }
        if (validate.isEmpty(this._salutation)) {
            return false
        } else {
            if (!defaults.supprtedSalutations[this.languageId].includes(this._salutation)) return false
        }
        if (validate.isEmpty(this._firstname)) return false
        if (validate.isEmpty(this._lastname)) return false
        if (validate.isEmpty(this._specs)) this._specs = {}
        if (validate.isEmpty(this._roles)) this._roles = []
        if (!this._roles.length) {
            this._roles.push(new Role({ id: "user", rank: 3 }))
        }
        if (validate.isEmpty(this._active)) this._active = true
        if (validate.isEmpty(this._verified)) this._verified = false

        return true
    }

    create() {
        return this.__({
            preExecute: () => {
                return new Promise((resolve, reject) => {
                    this.exists().then(exists => {
                        console.log(exists)
                        if (exists) {
                            reject({
                                status: 400,
                                message: "User already exists"
                            })
                        } else {
                            if (this._roles.findIndex(e => e.id === "user") === -1) {
                                this._roles.push(new Role(Role.USER))
                            }
                            resolve()
                        }
                    })
                })
            },
            method: httpRequest.POST,
            path: "/user/create",
            //create: true,
            parseResult: null,
            validator: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/user/read",
            parseResult: httpRequest.JSON,
            params: {
                id: {
                    value: this._id,
                    validate: "email",
                    required: true
                }
            }
        })
    }

    update() {
        return this.__({
            method: httpRequest.POST,
            path: "/user/update",
            parseResult: null,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/user/delete",
            parseResult: null,
            delete: true,
            params: {
                id: {
                    value: this._id,
                    required: true,
                    validate: "email"
                }
            }
        })
    }

    generatePassword() {
        return this.__({
            method: httpRequest.GET,
            path: "/security/generate/password",
            params: {
                uid: {
                    value: this._id,
                    validate: "email",
                    required: true
                }
            },
            returnCb: data => {
                return data.password
            }
        })
    }

    exists() {
        return this.__({
            method: httpRequest.GET,
            path: "/user/exists",
            parseResult: null,
            params: {
                id: {
                    value: this._id,
                    validate: "email",
                    required: true
                }
            },
            returnCb: data => {
                return data.toString() === "true"
            }
        })
    }

    linkedProjects(account) {
        return this.__({
            method: httpRequest.GET,
            path: "/user/linkedprojects",
            params: {
                uid: {
                    value: this._id,
                    validate: "email",
                    required: true
                },
                aid: {
                    value: account instanceof Account ? account.id : account,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                let projects = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        projects.push(new Project({
                            id: data[i].id,
                            accountId: data[i].account_id,
                            specs: {
                                description: data[i].description
                            }
                        }))
                    }
                }
                return projects
            }
        })
    }

    relinkToProject(newUser, account) {
        return this.__({
            method: httpRequest.GET,
            path: "/user/relink",
            parseResult: null,
            params: {
                uido: {
                    value: this._id,
                    validate: "email",
                    required: true
                },
                uidn: {
                    value: newUser instanceof User ? newUser.id : newUser,
                    validate: "email",
                    required: true
                },
                aid: {
                    value: account instanceof Account ? account.id : account,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    addRole(role) {
        if (typeof role !== "undefined" && role != null) {
            let _role
            if (role instanceof Role && validate.isString(role.id, null, validate.NOT_NULL)) {
                _role = role
            } else if (validate.isString(role)) {
                _role = new Role(role)
            }
            if (this._roles.find(e => e.id === _role.id) !== -1) {
                this._roles.push(_role)
                return true
            }
        } else {
            return false
        }
    }

    removeRole(role) {
        if (typeof role !== "undefined" && role !== null && this._roles.length) {
            let id = role instanceof Role && validate.isString(role.id, null, validate.NOT_NULL) && Role.AVAILABLE_ROLES.includes(role.id) ? role.id : validate.isString(role, null, validate.NOT_NULL) && Role.AVAILABLE_ROLES.includes(role) ? role : null,
                idx = id ? this._roles.findIndex(e => e.id === id) : -1
            if (idx > -1) {
                this._roles.splice(idx, 1)
                return true
            }
        } else {
            return false
        }
    }

    hasRole(role) {
        if (typeof role !== "undefined" && role !== null && this._roles.length) {
            let id = role instanceof Role && validate.isString(role.id, null, validate.NOT_NULL) && Role.AVAILABLE_ROLES.includes(role.id) ? role.id : validate.isString(role, null, validate.NOT_NULL) && Role.AVAILABLE_ROLES.includes(role) ? role : null,
                idx = id ? this._roles.findIndex(e => e.id === id) : -1

            return idx > -1
        } else {
            return false
        }
    }

    addAccount(account) {
        if (typeof account !== "undefined" && account !== null) {
            let _account
            if (account instanceof Account && validate.isNumber(account.id)) {
                _account = account
            } else if (validate.isNumber(account)) {
                _account = new Account(account)
            }
            if (this._accounts.find(e => e.id === _account.id) !== -1) {
                this._accounts.push(_account)
                return true
            }
        }
        return false
    }

    removeAccount(account) {
        if (typeof account !== "undefined" && account !== null && this._accounts.length) {
            let id = account instanceof Account && validate.isNumber(account.id, validate.NOT_NULL) ? account.id : validate.isNumber(account) ? account : null,
                idx = id ? this._accounts.findIndex(e => e.id === id) : -1
            if (idx > -1) {
                this._accounts.splice(idx, 1)
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    hasAccount(account) {
        if (typeof account !== "undefined" && account !== null && this._accounts.length) {
            let id = account instanceof Account && validate.isNumber(account.id, validate.NOT_NULL) ? account.id : validate.isNumber(account) ? account : null,
                idx = id ? this._accounts.findIndex(e => e.id === id) : -1
            return idx > -1
        } else {
            return false
        }
    }

    static readAll(accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/user/read/all",
            params: {
                id: {
                    value: accountId instanceof Account ? accountId.id : accountId,
                    validate: "number"
                }
            },
            returnCb: data => {
                let users = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        users.push(new User(data[i]))
                    }
                }
                return users
            }
        })
    }

    static exists(user) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/user/exists",
            parseResult: null,
            params: {
                id: {
                    value: user instanceof User ? user.id : user,
                    validate: "email",
                    required: true
                }
            },
            returnCb: data => {
                return data.toString() === "true"
            }
        })
    }

    static notConfirmed() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/user/notconfirmed",
            returnCb: data => {
                let users = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        users.push(new User(data[i]))
                    }
                }
                return users
            }
        })
    }

}

