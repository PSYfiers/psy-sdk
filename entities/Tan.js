const AbstractEntity = require("./AbstractEntity")
const Participant = require("./Participant")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Tan extends AbstractEntity {
    constructor(data) {
        super(Tan)
        if (data) {
            if (validate.isObject(data))
                this._parseJson(data)
        }
    }

    static get FILTER_ACTIVE_ONLY() {
        return e => e.active === true
    }

    static get FILTER_INACTIVE_ONLY() {
        return e => e.active === false
    }

    static get FILTER_UNIQUE_ONLY() {
        return e => e.isUnique === true
    }

    static get FILTER_MULTIPLE_ONLY() {
        return e => e.isUnique === false
    }

    set id(id) {
        if (validate.isString(id))
            this._id = id
        else
            throw new Error("Parameter must be of type string")
    }

    get id() {
        return this._id
    }

    set projectId(projectId) {
        if (validate.isString(projectId))
            this._projectId = projectId
        else
            throw new Error("Parameter must be of type string")
    }

    get projectId() {
        return this._projectId
    }

    set accountId(accountId) {
        if (validate.isNumber(accountId))
            this._accountId = accountId
        else
            throw new Error("Parameter must be of type number")
    }

    get accountId() {
        return this._accountId
    }

    set isUnique(isUnique) {
        if (validate.isBoolean(isUnique))
            this._isUnique = isUnique
        else
            throw new Error("Parameter must be of type boolean")
    }

    get isUnique() {
        return this._isUnique
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

    get created() {
        return this._created
    }

    _parseJson(data) {        
        this._id = validate.isString(data.id, null, validate.NOT_NULL) || validate.isString(data.tan, null, validate.NOT_NULL) ? data.id || data.tan : null
        this._projectId = validate.isString(data.projectId, null, validate.NOT_NULL) ? data.projectId : null
        this._accountId = validate.isNumber(data.accountId, validate.NOT_NULL) ? data.accountId : null
        this._isUnique = validate.isBoolean(data.isUnique, validate.NOT_NULL) ? data.isUnique : null
        this._active = validate.isBoolean(data.active, validate.NOT_NULL) ? data.active : null
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : new Date()
    }

    _validate(create = false) {
        if (!create)
            if (validate.isEmpty(this._id)) return false
        if (validate.isEmpty(this._projectId)) return false
        if (validate.isEmpty(this._accountId)) return false

        return true
    }

    create(quantity = 1, length = 6) {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/create",
            validator: true,
            create: true,
            params: {
                aid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: this._projectId,
                    validate: "string",
                    required: true
                },
                number: {
                    value: quantity,
                    validate: "number",
                    required: true
                },
                length: {
                    value: length,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                let tans = []
                if (data) {
                    for (let i = 0, len = data.data.length; i < len; i++) {
                        tans.push(new Tan({
                            accountId: this._accountId,
                            projectId: this._projectId,
                            id: data.data[i],
                            isUnique: true,
                            active: true
                        }))
                    }
                }
                return tans
            }
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/read",
            //validator: true,
            parseResult: httpRequest.JSON,
            params: {
                tan: {
                    value: this._id,
                    validate: "string",
                    required: true
                },
                pid: {
                    value: this._projectId,
                    validate: "string",
                    required: true
                },
                aid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    invalidate() {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/invalidate",
            validator: true,
            params: {
                tan: {
                    value: this._id,
                    validate: "string",
                    required: true
                },
                projectid: {
                    value: this._projectId,
                    validate: "string",
                    required: true
                },
                accountid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                }
            },
            returnCb: () => {
                this._active = false
                return
            }
        })
    }

    validate() {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/validate",
            params: {
                tan: {
                    value: this.id,
                    validate: "string",
                    required: true
                },
                projectid: {
                    value: this._projectId,
                    validate: "string",
                    required: true
                },
                accountid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                },
                nt: {
                    value: "true",
                    validate: "string",
                    reqired: true
                }
            },
            returnCb: data => {
                return data.status === 200
            }
        })
    }

    isAvailable() {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/check/available",
            params: {
                tan: {
                    value: this._id,
                    validate: "string",
                    required: true
                },
                aid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: this._projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                return data.available
            }
        })
    }
    
    login(tan, projectId, accountId) {        
        return this.__({
            method: httpRequest.GET,
            path: "/tan/login",
            params: {
                tan: {
                    value: tan,
                    validate: "string",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string"
                },
                aid: {
                    value: accountId,
                    validate: "number"
                }
            },
            returnCb: async (data) => {
                let participant = new Participant()
                participant.__connection = this.connection               
                participant.tan = data.id
                participant.accountId = data.account_id
                participant.projectId = data.project_id
                await participant.read()                   
                return participant
            }
        })
    }

    readAll(accountId, projectId, ...filters) {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/read/all",
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                let tans = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        let tan = new Tan(data[i])
                        tan._connection = this.connection
                        tans.push(tan)
                    }
                }

                if (tans.length) {
                    for (let filter of filters) {
                        tans = tans.filter(filter)
                    }
                }

                return tans
            }
        })
    }

    available(accountId, projectId) {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/available",
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                let tans = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        let tan = new Tan(data[i])
                        tan.__connection = this.connection
                        tans.push(tan)
                    }
                }
                return tans
            }
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/tan/delete",
            delete: true,
            parseResult: null,
            params: {
                tan: {
                    value: this._id,
                    validate: "string",
                    required: true
                },
                pid: {
                    value: this._projectId,
                    validate: "string",
                    required: true
                },
                aid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    static create(quantity = 1, length = 6) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/create",
            validator: true,
            create: true,
            params: {
                number: {
                    value: quantity,
                    validate: "number",
                    required: true
                },
                length: {
                    value: length,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                return data.data
            }
        })
    }

    static invalidate(id, projectId, accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/invalidate",
            parseResult: null,
            params: {
                tan: {
                    value: id,
                    validate: "string",
                    required: true
                },
                projectid: {
                    value: projectId,
                    validate: "string",
                    required: true
                },
                accountid: {
                    value: accountId,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    static login(tan, projectId, accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/login",
            params: {
                tan: {
                    value: tan,
                    validate: "string",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string"
                },
                aid: {
                    value: accountId,
                    validate: "number"
                }
            },
            returnCb: async (data) => {
                let participant = new Participant()
                participant.tan = data.id
                participant.accountId = data.account_id
                participant.projectId = data.project_id
                await participant.read()                      
                return participant
            }
        })
    }

    static readAll(accountId, projectId, ...filters) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/read/all",
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                let tans = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        tans.push(new Tan(data[i]))
                    }
                }

                if (tans.length) {
                    for (let filter of filters) {
                        tans = tans.filter(filter)
                    }
                }

                return tans
            }
        })
    }

    static count(accountId, projectId, activeOnly = false) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/count" + (activeOnly ? "/active" : ""),
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                return parseInt(data.count)
            }
        })
    }

    static validate(tan, projectId, accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/validate",
            params: {
                tan: {
                    value: tan,
                    validate: "string",
                    required: true
                },
                projectid: {
                    value: projectId,
                    validate: "string",
                    required: true
                },
                accountid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                nt: {
                    value: "true",
                    validate: "string",
                    reqired: true
                }
            },
            returnCb: data => {
                return data.status === 200
            }
        })
    }

    static available(accountId, projectId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/available",
            params: {
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                let tans = []
                if (data) {
                    for (let i = 0, len = data.length; i < len; i++) {
                        tans.push(new Tan(data[i]))
                    }
                }
                return tans
            }
        })
    }

    static isAvailable(tan, projectId, accountId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/check/available",
            params: {
                tan: {
                    value: tan,
                    validate: "string",
                    required: true
                },
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            },
            returnCb: data => {
                return data.available
            }
        })
    }

    static getTanlistPdf(accountId, projectId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/tan/tanlist/pdf",
            parseResult: httpRequest.RAW,
            returnResult: true,
            params:{
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                }
            }
        })
    }
}