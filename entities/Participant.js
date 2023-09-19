const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const defaults = require("../lib/defaults")
const validate = require("../modules/validate")

module.exports = class Participant extends AbstractEntity {
    constructor(data) {
        super(Participant)

        if (validate.isObject(data, validate.NOT_NULL)) {
            this._parseJson(data)
        }
    }
    static get SEX_FEMALE() {
        return 1
    }
    static get SEX_MALE() {
        return 2
    }
    static get SEX_DIVERSE() {
        return 3
    }

    static get CREATE_DEFAULT() {
        return 1
    }
    static get CREATE_UPDATE_CREATE_INVITE() {
        return 2
    }
    static get CREATE_UPDATE_CREATE() {
        return 3
    }


    set tan(tan) {
        if (validate.isString(tan))
            this._tan = tan
        else
            throw new Error("Parameter must be of type string")
    }

    get tan() {
        return this._tan
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

    set countryId(countryId) {
        if (validate.isCountryId(countryId))
            this._countryId = countryId
        else
            throw new Error("Not a valid country ID")
    }

    get countryId() {
        return this._countryId
    }

    set languageId(languageId) {
        if (validate.isLanguageId(languageId))
            this._languageId = languageId
        else
            throw new Error("Not a valid language ID")
    }

    get languageId() {
        return this._languageId
    }

    set dob(dob) {
        if (validate.isNumber(dob))
            this._dob = dob
        else
            throw new Error("Parameter must be of type number")
    }

    get dob() {
        return this._dob
    }

    set sex(sex) {
        if (sex === null || [Participant.SEX_FEMALE, Participant.SEX_MALE, Participant.SEX_DIVERSE].includes(sex))
            this._sex = sex
        else {
            if (typeof sex === "string" && /^[mfd]{1}$/.test(sex.toLowerCase())) {
                switch (sex.toLowerCase()) {
                    case "m":
                        this._sex = Participant.SEX_MALE
                        break
                    case "f":
                        this._sex = Participant.SEX_MALE
                        break
                    case "d":
                        this._sex = Participant.SEX_DIVERSE
                }
            } else {
                throw new Error("Sex must have one of the following values: 1=female, 2=male or 3=diverse.")
            }
        }

    }

    get sex() {
        return this._sex
    }

    set email(email) {
        if (validate.isEmail(email))
            this._email = email
        else
            throw new Error("Not a valid email address")
    }

    get email() {
        return this._email
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

    set profession(profession) {
        if (validate.isString(profession))
            this._profession = profession
        else
            throw new Error("Parameter must be of type string")

    }

    get profession() {
        return this._profession
    }

    set postcode(postcode) {
        if (validate.isString(postcode))
            this._postcode = postcode
        else
            throw new Error("Parameter must be of type string")

    }

    get postcode() {
        return this._postcode
    }

    set fulltype(fulltype) {
        if (validate.isFulltype(fulltype))
            this._fulltype = fulltype
        else
            throw new Error("Not a valid fulltype string")
    }

    get fulltype() {
        return this._fulltype
    }

    set e(e) {
        if (validate.isNumber(e))
            this._e = e
        else
            throw new Error("E must be of type number")
    }

    get e() {
        return this._e
    }

    set s(s) {
        if (validate.isNumber(s))
            this._s = s
        else
            throw new Error("S must be of type number")

    }

    get s() {
        return this._s
    }

    set n(n) {
        if (validate.isNumber(n))
            this._n = n
        else
            throw new Error("N must be of type number")

    }

    get n() {
        return this._n
    }

    set t(t) {
        if (validate.isNumber(t))
            this._t = t
        else
            throw new Error("T must be of type number")

    }

    get t() {
        return this._t
    }

    set f(f) {
        if (validate.isNumber(f))
            this._f = f
        else
            throw new Error("F must be of type number")

    }

    get f() {
        return this._f
    }

    set j(j) {
        if (validate.isNumber(j))
            this._j = j
        else
            throw new Error("J must be of type number")

    }

    get j() {
        return this._j
    }

    get invited() {
        return this._invited
    }

    get resultRecieved() {
        return this._resultRecieved
    }

    get printed() {
        return this._printed
    }

    get created() {
        return this._created
    }


    _parseJson(data) {
        this._tan = validate.isString(data.tan, null, validate.NOT_NULL) ? data.tan : null
        this._projectId = validate.isString(data.projectId, null, validate.NOT_NULL) ? data.projectId : null
        this._accountId = validate.isNumber(data.accountId, validate.NOT_NULL) ? data.accountId : null
        this._firstname = validate.isString(data.firstname, null, validate.NOT_NULL) ? data.firstname : null
        this._lastname = validate.isString(data.lastname, null, validate.NOT_NULL) ? data.lastname : null
        this._countryId = validate.isCountryId(data.countryId, validate.NOT_NULL) ? data.countryId : null
        this._languageId = validate.isLanguageId(data.languageId, validate.NOT_NULL) ? data.languageId : null
        this._dob = validate.isNumber(data.dob, validate.NOT_NULL) ? data.dob : null
        this._sex = validate.isNumber(data.sex, validate.NOT_NULL) ? data.sex : null
        this._email = validate.isEmail(data.email, validate.NOT_NULL) ? data.email : null
        this._phone = validate.isString(data.phone, null, validate.NOT_NULL) ? data.phone : null
        this._profession = validate.isString(data.profession, null, validate.NOT_NULL) ? data.profession : null
        this._postcode = validate.isString(data.postcode, null, validate.NOT_NULL) ? data.postcode : null
        this._fulltype = validate.isFulltype(data.fulltype, validate.NOT_NULL) ? data.fulltype : null
        this._e = validate.isNumber(data.e, validate.NOT_NULL) ? data.e : null
        this._s = validate.isNumber(data.s, validate.NOT_NULL) ? data.s : null
        this._n = validate.isNumber(data.n, validate.NOT_NULL) ? data.n : null
        this._t = validate.isNumber(data.t, validate.NOT_NULL) ? data.t : null
        this._f = validate.isNumber(data.f, validate.NOT_NULL) ? data.f : null
        this._j = validate.isNumber(data.j, validate.NOT_NULL) ? data.j : null
        this._invited = validate.isDate(data.invited, validate.NOT_NULL) ? data.invited : null
        this._resultRecieved = validate.isDate(data.resultRecieved, validate.NOT_NULL) ? data.resultRecieved : null
        this._printed = validate.isBoolean(data.printed, validate.NOT_NULL) ? data.printed : null
        this._created = validate.isDate(data.created, validate.NOT_NULL) ? data.created : null
    }

    _validate() {
        if (validate.isEmpty(this.tan)) return false
        if (validate.isEmpty(this.projectId)) return false
        if (validate.isEmpty(this.accountId)) return false

        return true
    }

    create(options) {
        return new Promise((resolve, reject) => {
            if (this._validate()) {
                let params = null
                if (options && validate.isBoolean(options.create)) {
                    params = { create: options.create }
                }
                if (options
                    && options.mode
                    && [Participant.CREATE_DEFAULT, Participant.CREATE_UPDATE_CREATE, Participant.CREATE_UPDATE_CREATE_INVITE].includes(options.mode)) {

                    if (!params) {
                        params = {}
                    }
                    params.mode = options.mode
                }
                console.log(params)
                httpRequest.request(httpRequest.POST, defaults.BASE + "/participant/create", null, params, this.toJson())
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            message: "Error creating participant"
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing, wrong value or incomplete"
                })
            }
        })
    }

    read() {
        return super.__({
            parseResult: httpRequest.JSON,
            method: httpRequest.GET,
            path: "/participant/read",
            params: {
                tan: {
                    value: this._tan,
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

    update() {
        return this.__({
            method: httpRequest.POST,
            path: "/participant/update",
            validation: true,
            parseResult: null,
            returnResult: false,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/participant/delete",
            delete: true,
            parseResult: null,
            returnResult: false,
            params: {
                tan: {
                    value: this._tan,
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

    assignToOtherProject(newAccountId, newProjectId) {
        return new Promise((resolve, reject) => {
            if (validate.isString(this._tan, null, validate.NOT_NULL)
                && validate.isString(this._projectId, null, validate.NOT_NULL)
                && validate.isNumber(this._accountId, validate.NOT_NULL)) {

                if (validate.isNumber(newAccountId, validate.NOT_NULL)
                    && validate.isString(newProjectId, null, validate.NOT_NULL)) {

                    httpRequest.request(httpRequest.GET, defaults.BASE + "/participant/relink", null, {
                        tan: this._tan,
                        oldpid: this._projectId,
                        oldaid: this._accountId,
                        newpid: newProjectId,
                        newaid: newAccountId
                    })
                        .then(() => {
                            this._accountId = newAccountId
                            this._projectId = newProjectId
                            resolve()
                        })
                        .catch(err => {
                            reject({
                                status: err.status,
                                message: "Error assigning participant to new project"
                            })
                        })
                } else {
                    reject({
                        status: 400,
                        message: "One or more parameters (newProjectId, newAccountId) missing, of wrong type or incomplete"
                    })

                }
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters (tan, projectId, accountId) missing, wrong value or incomplete"
                })
            }
        })
    }

    static count(accountId, projectId) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/participant/count",
            params: {
                pid: {
                    value: projectId,
                    validate: "string",
                    required: true
                },
                aid: {
                    value: accountId,
                    validate: "number",
                    required: true
                }
            },
            returnCb: data => {
                return data.count
            }
        })        
    }

    static readAll(accountId, projectId, limit, offset) {
        return new Promise((resolve, reject) => {
            if (validate.isNumber(accountId, validate.NOT_NULL)
                && validate.isString(projectId, null, validate.NOT_NULL)) {

                let params = {
                    aid: accountId,
                    pid: projectId
                }
                if (validate.isNumber(limit, validate.NOT_NULL)) {
                    params.limit = limit
                    if (validate.isNumber(offset, validate.NOT_NULL))
                        params.offset = offset
                }
                httpRequest.request(httpRequest.GET, defaults.BASE + "/participant/read/all", null, params)
                    .then(data => {
                        let participants = []
                        for (let i = 0, len = data.length; i < len; i++) {
                            participants.push(new Participant(data[i]))
                        }
                        resolve(participants)
                    })
                    .catch(err => {
                        reject({
                            status: err.status,
                            message: "Error while reading all participants from project"
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing, of wrong type or incomplete"
                })
            }
        })
    }

    static createFromCSV(data) {
        return new Promise((resolve, reject) => {
            if (typeof data === "object") {
                if (typeof data.settings === "object") {
                    if (typeof data.config === "object") {
                        if (validate.isString(data.content)) {
                            httpRequest.request(httpRequest.POST, defaults.BASE + "/participant/upload/csv", null, null, data)
                                .then(() => {
                                    resolve()
                                })
                                .catch(err => {
                                    reject({
                                        status: err.status,
                                        message: "Error createing new participants from CSV"
                                    })
                                })
                        } else {
                            reject({
                                status: 400,
                                message: "Field \"content\" in paramter object must be of type string"
                            })
                        }
                    } else {
                        reject({
                            status: 400,
                            message: "Field \"config\" in paramter object must be of type object"
                        })
                    }
                } else {
                    reject({
                        status: 400,
                        message: "Field \"settings\" in paramter object must be of type object"
                    })
                }
            } else {
                reject({
                    status: 400,
                    message: "Parameter must be of type object"
                })
            }
        })
    }

}