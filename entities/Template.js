const AbstractEntity = require("./AbstractEntity")
const httpRequest = require("../lib/httpRequest")
const { validate } = require("psy-tools")

module.exports = class Template extends AbstractEntity {
    constructor(data) {
        super(Template)
        if (data) {
            if (validate.isObject(data))
                this._parseJson()
            else if (validate.isString(data, 60))
                this._id = data
        }
    }

    set id(id) {
        if (!validate.isString(id, 60, validate.NOT_NULL))
            throw new Error("Id must be a string of a maximum length of 60 characters")
        this._id = id
    }

    get id() {
        return this._id
    }

    set conf(config) {
        if (!validate.isObject(config, validate.NOT_NULL))
            throw new Error("Config must be an object")
        this._conf = config
    }

    get conf() {
        return this._conf
    }

    _parseJson(data) {
        this._id = validate.isString(data.id, 60, validate.NOT_NULL) ? data.id : null
        this._conf = validate.isObject(data.conf, validate.NOT_NULL) ? data.conf : null
    }

    _validate(data) {
        if (validate.isEmpty(this._id)) return false
        if (validate.isEmpty(this._conf)) return false

        return true
    }

    create() {
        return this.__({
            method: httpRequest.POST,
            path: "/template/conf/create",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    read() {
        return this.__({
            method: httpRequest.GET,
            path: "/template/conf/read",
            parseResult: httpRequest.JSON,
            params: {
                id: {
                    value: this._id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    update() {
        return this.__({
            method: httpRequest.POST,
            path: "/template/conf/update",
            parseResult: null,
            validator: true,
            body: this
        })
    }

    delete() {
        return this.__({
            method: httpRequest.GET,
            path: "/template/conf/delete",
            delete: true,
            parseResult: null,
            params: {
                id: {
                    value: this._id,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static listIds() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/template/conf/list",
            returnResult: true
        })
    }

    static listSubdirs() {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/template/conf/list/subdirs",
            returnResult: true
        })
    }

    static getImageInjectionpoints(type, subdir, languageId, page, params) {
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/template/conf/injectionpoints",
            returnResult: true,
            params: {
                name: {
                    value: type.toUpperCase(),
                    validate: "fulltype",
                    required: true
                },
                subdir: {
                    value: subdir,
                    validate: "string",
                    required: true
                },
                lang: {
                    value: languageId,
                    validate: "languageId",
                    required: true
                },
                page: {
                    value: page,
                    validate: "number",
                    required: true
                },
                params: {
                    value: params,
                    validate: "string",
                    required: true
                }
            }
        })
    }

    static usedFonts(){
        return new AbstractEntity().__({
            method: httpRequest.GET,
            path: "/template/conf/fonts/used",
            returnResult: true
        })
    }
}