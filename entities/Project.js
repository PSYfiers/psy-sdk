const AbstractEntity = require("./AbstractEntity")
const Tan = require("./Tan")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const { validate } = require("psy-tools")

module.exports = class Project extends AbstractEntity {
    constructor(data) {
        super(Project)
        this._specs = {}
        this._productNames = {}
        this._tans = []

        if (validate.isObject(data, validate.NOT_NULL)) {
            this._parseJson(data)
        }
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

    set accountId(accountId) {
        if (validate.isNumber(accountId))
            this._accountId = accountId
        else
            throw new Error("Parameter must be of type number")

    }
    get accountId() {
        return this._accountId
    }

    set start(start) {
        if (validate.isDate(start))
            this._start = start
        else
            throw new Error("Parameter must be of type Date (MM/DD/YYY)")
    }

    get start() {
        return this._start
    }

    set end(end) {
        if (validate.isDate(end))
            this._end = end
        else
            throw new Error("Parameter must be of type Date (MM/DD/YYY)")
    }

    get end() {
        return this._end
    }

    set isProtected(isProtected) {
        if (validate.isBoolean(isProtected))
            this._isProtected = isProtected
        else
            throw new Error("Parameter must be of type boolean")
    }

    get isProtected() {
        return this._isProtected
    }

    set productId(productId) {
        if (validate.isNumber(productId))
            this._productId = productId
        else
            throw new Error("Parameter must be of type number")
    }

    get productId() {
        return this._productId
    }

    get productNames() {
        return this._productNames
    }

    get specs() {
        return this._specs
    }

    get tans() {
        return this._tans
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
        this._id = validate.isString(data.id, null, validate.NOT_NULL) ? data.id : null
        this._accountId = validate.isNumber(data.accountId, validate.NOT_NULL) ? data.accountId : null
        this._start = validate.isDate(data.start, validate.NOT_NULL) ? data.start : null
        this._end = validate.isDate(data.end, validate.NOT_NULL) ? data.end : null
        this._isProtected = validate.isBoolean(data.isProtected, validate.NOT_NULL) ? data.isProtected : true
        this._productId = validate.isNumber(data.productId, validate.NOT_NULL) ? data.productId : null
        this._productNames = validate.isObject(data.productNames, validate.NOT_NULL) ? data.productNames : {}
        this._specs = validate.isObject(data.specs, validate.NOT_NULL) ? data.specs : null
        this._tans = data.tans ? data.tans : []
        this._active = validate.isBoolean(data.active, validate.NOT_NULL) ? data.active : false
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : null
    }

    _validate(create = false) {
        if (!create) {
            if (validate.isEmpty(this._id)) return false
        }
        if (validate.isEmpty(this._accountId)) return false
        if (validate.isEmpty(this._productId)) return false
        if (validate.isEmpty(this._isProtected)) this._isProtected = true
        if (validate.isEmpty(this._active)) this._active = true
        if (validate.isEmpty(this._specs)) this._specs = {}

        return true
    }

    create(projectName, moderatorId, languageId, isProtected = true) {
        return new Promise((resolve, reject) => {
            if (this._validate(true)) {
                if (validate.isString(projectName, null, validate.NOT_NULL)
                    && validate.isEmail(moderatorId, validate.NOT_NULL)
                    && validate.isLanguageId(languageId, validate.NOT_NULL)) {

                    let postData = this.toJson()
                    if (!postData.specs) postData.specs = {}
                    postData.specs.description = projectName
                    postData.specs.language = languageId
                    postData.specs.moderator = moderatorId
                    postData.specs.notTanProtected = validate.isBoolean(isProtected) ? !isProtected : true

                    httpRequest.request(httpRequest.POST, defaults.BASE + "/project/create", null, null, postData)
                        .then(data => {
                            if (data) {
                                this._parseJson(data)
                                resolve()
                            } else {
                                reject({
                                    status: 500,
                                    message: "Error creating project: no data recieved"
                                })
                            }
                        })
                        .catch(err => {
                            reject({
                                status: err.status,
                                message: "Error creating project"
                            })
                        })
                } else {
                    reject({
                        status: 400,
                        message: "One or more parameters (projectName, moderatorId, languageId) are missing, of wrong type or incomplete"
                    })
                }
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing or incomplete"
                })
            }
        })
    }


    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/project/read",
            parseResult: httpRequest.JSON,
            params: {
                pid: {
                    value: this._id,
                    validate: "string",
                    required: true
                },
                id: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    updateSpecs() {
        return this.__({
            method: httpRequest.POST,
            path: "/project/update/specs",
            parseResult: null,
            params: {
                pid: {
                    value: this._id,
                    validate: "string",
                    required: true
                },
                aid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                }
            },
            body: this._specs
        })
    }

    /**
     * For test purposes only!
     * @returns null
     */
    __delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/project/test/delete",
            delete: true,
            parseResult: null,
            params: {
                aid: {
                    value: this._accountId,
                    validate: "number",
                    required: true
                },
                pid: {
                    value: this._id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    readAll(accountId, limit, offset) {
        return this.__({
            method: httpRequest.GET,
            path: "/project/read/all",
            params: {
                id: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                limit: {
                    value: limit,
                    validate: "number"
                },
                offset: {
                    value: offset,
                    validate: "number"
                }
            },
            returnCb: data => {
                let projects = []
                for (let i = 0, len = data.length; i < len; i++) {
                    const project = new Project(data[i])
                    project.__connection = this.connection
                    projects.push(project)
                }
                return projects
            }
        })
    }

    /**
     * W A R N I N G
     * Todo: Implement verify if enough TANs are available!
     */
    static increaseTan(accountId, projectId, tanCount) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/increase/tan",
            parseResult: null,
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
                },
                count: {
                    value: tanCount,
                    validate: "number",
                    required: true
                }
            }
        })
    }

    static toggleOnline(accountId, projectId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/online",
            parseResult: null,
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
            }
        })
    }

    static countTans(accountId, projectId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/count/tan",
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

    static checkVipURL(url) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/check",
            returnResult: true,
            params: {
                url: {
                    value: url,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static readAll(accountId, limit, offset) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/read/all",
            params: {
                id: {
                    value: accountId,
                    validate: "number",
                    required: true
                },
                limit: {
                    value: limit,
                    validate: "number"
                },
                offset: {
                    value: offset,
                    validate: "number"
                }
            },
            returnCb: data => {
                let projects = []
                for (let i = 0, len = data.length; i < len; i++) {
                    projects.push(new Project(data[i]))
                }
                return projects
            }
        })
    }

    static getExcelData(accountId, projectId) {
        return Project._excel(accountId, projectId, "data")
    }

    static getExcelFile(accountId, projectId) {
        return Project._excel(accountId, projectId, "file")
    }

    static _excel(accountId, projectId, what = "file") {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(accountId, validate.NOT_NULL)
                && validate.isString(projectId, null, validate.NOT_NULL)) {
                httpRequest.request(httpRequest.GET, defaults.BASE + (what === "data" ? "/project/excel/data" : "/project/excel/file"), null, {
                    aid: accountId,
                    pid: projectId
                }, null, what === "data" ? httpRequest.JSON : httpRequest.RAW)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            message: what === "data" ? "Error recieving Excel-Data" : "Error recieving Excel-File"
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing or incomplete"
                })
            }
        })
    }

    static listExcelDefinitions() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/excel/template/def/all",
            returnResult: true
        })
    }

    static readExcelTemplateDefinition(id) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/project/excel/template/def/read",
            returnResult: true,
            params: {
                id: {
                    value: id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static getTanlistPdf(accountId, projectId) {
        return Tan.getTanlistPdf(accountId, projectId)
    }
}