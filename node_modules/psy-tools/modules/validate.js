const URL = require("url").URL

module.exports = {
    NOT_NULL: true,

    isBase64(data) {
        const base64RegEx = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/
        return this._is(data, true, "string") ? base64RegEx.test(data) : false
    },

    isEmail(data, notNull = false) {
        let emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        return this._is(data, notNull, "string")
            ? this.isEmpty(data)
                ? true
                : emailRegEx.test(data)
            : false

    },

    isPasswordStrength(data) {
        let passwordRegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{10,})/g
        return this._is(data, true, "string") ? passwordRegExp.test(data) : false
    },

    isPath(data, notNull = false) {
        let pathRegEx = /^[A-Za-z0-9\-\_]*$/
        return this._is(data, notNull, "string")
            ? this.isEmpty(data)
                ? true
                : pathRegEx.test(data)
            : false
    },

    isCountryId(data, notNull = false) {
        return this._is(data, notNull, "string")
            ? this.isEmpty(data)
                ? true
                : /^[A-Z]{2}$/.test(data)
            : false
    },

    isLanguageId(data, notNull = false) {
        return this._is(data, notNull, "string")
            ? this.isEmpty(data)
                ? true
                : /^[a-z]{2}$/.test(data)
            : false
    },

    isCurrency(data, notNull = false) {
        return this._is(data, notNull, "string")
            ? this.isEmpty(data)
                ? true
                : /^[A-Z]{3}$/.test(data)
            : false
    },

    isDate(data, notNull = false) {
        if (data instanceof Date) {
            return true
        } else if (this._is(data, notNull, "string")) {
            if (this.isEmpty(data)) {
                return true
            } else {
                return !isNaN(Date.parse(data))
            }
        } else {
            return false
        }
    },

    isFulltype(data, notNull = false) {
        return this._is(data, notNull, "string")
            ? this.isEmpty(data)
                ? true
                : /^[EI]{1}[SN]{1}[TF]{1}[JP]{1}$/.test(data)
            : false
    },

    isString(data, maxlength, notNull = false) {
        if (this._is(data, notNull, "string")) {
            if (this.isNumber(maxlength, this.NOT_NULL)) {
                return data.length <= maxlength
            } else {
                return true
            }
        } else {
            return false
        }
    },

    isNumber(data, notNull = false) {
        return this._is(data, notNull, "number")
    },

    isBool(data, notNull = false) {
        return this.isBoolean(data, notNull)
    },

    isBoolean(data, notNull = false) {
        return this._is(data, notNull, "boolean")
    },

    isEmpty(data) {
        return !(data || data === false || data === 0)
    },

    isObject(data, notNull = false) {
        return this._is(data, notNull, "object")
    },

    isArray(data, notNull = false) {
        if (notNull === false && this.isEmpty(data)) return true
        if (notNull === true && data === null) return false
        return Array.isArray(data)
    },

    isURL(data, notNull = false){
        if(notNull === false && this.isEmpty(data)) return false
        if(notNull === true && data===null) return false
        try{
            new URL(data)
            return true
        } catch(err){
            return false
        }
    },

    _is(data, notNull, type) {
        if (notNull === false && this.isEmpty(data)) return true
        if (notNull === true && data === null) return false
        return typeof data === type
    }

}