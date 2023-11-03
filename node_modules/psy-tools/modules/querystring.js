const validate = require("./validate")

module.exports = {
    encode(data) {
        let querystring = ""

        if (validate.isObject(data)) {
            for (let key in data) {
                querystring +=  this._encode(key, data[key])
            }
        }
        return querystring.startsWith("&") ? querystring.substring(1):querystring
    },
    _encode(key, value) {

        let parametersting = ""

        if (validate.isArray(value)) {

            value.forEach(element => {
                parametersting += this._encode(key, element)
            });
        } else if (validate.isObject(value)) {

            for (let key in value) {
                parametersting += this._encode(key, value[key])
            }

        } else {
            parametersting = "&" + key + "=" + value
        }
        return parametersting
    }
}