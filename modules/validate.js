module.exports = {

    NOT_NULL: true,

    isBase64(data) {
        const base64RegEx = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/
        return typeof data === "string" && base64RegEx.test(data)
    },

    isEmail(data, notNull = false) {
        let emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        return this.isEmpty(data) !== notNull || (typeof data === "string" && emailRegEx.test(data))
    },

    isPasswordStrength(data, notNull = false) {
        let passwordRegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{10,})/g
        return typeof data === "string" && passwordRegExp.test(data)
    },

    isPath(data, notNull = false) {
        let pathRegEx = /^[A-Za-z0-9\-\_]*$/
        return this.isEmpty(data) !== notNull || (typeof data === "string" && pathRegEx.test(data))
    },

    isCountryId(data, notNull = false) {
        return this.isEmpty(data) !== notNull || (typeof data === "string" && /^[A-Z]{2}$/.test(data))
    },

    isLanguageId(data, notNull = false) {
        return this.isEmpty(data) !== notNull || (typeof data === "string" && /^[a-z]{2}$/.test(data))
    },

    isCurrency(data, notNull = false) {
        return this.isEmpty(data) !== notNull || (typeof data === "string" && /^[A-Z]{3}$/.text(data))
    },

    isDate(data, notNull = false) {
        if (typeof data === "string") {
            return !isNaN(Date.parse(data))
        } else if (data instanceof Date) {
            return true
        } else if (this.isEmpty(data) !== notNull) {
            return true
        } else {
            return false
        }
    },

    isFulltype(data, notNull = false) {
        return this.isEmpty(data) !== notNull || (typeof data === "string" && /^[EI]{1}[SN]{1}[TF]{1}[JP]{1}$/.test(data))
    },

    isString(data, maxlength, notNull = false) {
        if (this.isEmpty(data) !== notNull || typeof data === "string") {
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
        return this.isEmpty(data) !== notNull || typeof data === "number"
    },

    isBool(data, notNull = false) {
        return this.isBoolean(data, notNull)
    },

    isBoolean(data, notNull = false) {
        return this.isEmpty(data) !== notNull || typeof data === "boolean"
    },

    isEmpty(data) {
        return !(data || data === false || data === 0)
    },

    isObject(data, notNull = false) {
        return this.isEmpty(data) !== notNull || typeof data === "object"
    }

}