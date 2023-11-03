const defaults = require("./defaults")
const https = defaults.PROTOCOL === "http" ? require("http") : require("https")
const { querystring } = require("psy-tools")
const FormData = require("form-data")

module.exports = {
    GET: "GET",
    POST: "POST",
    JSON: "json",
    STRING: "string",
    BOOL: "bool",
    RAW: "raw",
    MAX_SIZE: 4098,
    connection: null,    
    encodeParams(params) {
        for (let key in params) {
            if (typeof params[key] === "string" && !params[key].startsWith("{")) {
                params[key] = encodeURIComponent(params[key])
            }
        }
        return Object.keys(params).length ? "?" + querystring.encode(params) : ""
    },
    chunk(str, size) {
        let chunks = []
        if (str) {
            let offset = 0,
                len = str.length

            if (len <= size) {
                return chunks.push(str) && chunks
            }
            while (offset < len) {
                chunks.push(str.substr(offset, size))
                offset += size
            }
        }
        return chunks
    },
    request(method, path, headers, params, body, convert = "json") {
        return new Promise((resolve, reject) => {
            try {
                let requestParams = params ? this.encodeParams(params) : "",
                    defaultHeaders = method == this.POST ? {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    } : {},
                    options = {
                        host: this.connection ? this.connection.defaults.HOSTNAME : defaults.HOSTNAME,
                        port: this.connection ? this.connection.defaults.PORT : defaults.PORT,
                        path: path + requestParams,
                        method: method
                    }
                
                if (method === this.POST) {
                    if (headers) {
                        defaultHeaders.headers = headers
                    }
                    options = { ...options, ...defaultHeaders }
                }

                if (defaults.DEBUG) console.log(options)

                if (defaults.DEBUG) console.log("Prepare HTTPS-" + method + " request...")
                const req = https.request(options, res => {
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        const chunks = []

                        res.on("data", data => {
                            chunks.push(data)
                        })

                        res.on("end", () => {
                            let _body = Buffer.concat(chunks)

                            switch (convert) {
                                case "json":
                                    try {
                                        _body = JSON.parse(_body.toString())
                                    } catch (err) {
                                        _body = null
                                    }
                                    break;
                                case "string":
                                    _body = _body.toString()
                                    break;
                                case "bool":
                                    _body = _body.toString() == "true"
                                    break;
                            }
                            resolve(_body)

                        })
                    } else {
                        if (defaults.SHOWERRORS) console.error("Response status: " + res.statusCode)
                        reject({
                            status: res.statusCode,
                            message: "Error request data."
                        })
                    }
                })

                req.on("error", err => {
                    if (defaults.SHOWERRORS) console.error(err)
                    reject({
                        status: 500,
                        message: "Error in POST request",
                        error: err
                    })
                })
                if (body) {
                    if (body instanceof FormData) {
                        if (defaults.DEBUG) console.log("Try to write body:")
                        body.pipe(req)
                        if (defaults.DEBUG) console.log("Body written.")
                        return
                    } else {

                        let postData = JSON.stringify(body)
                        if (defaults.DEBUG) console.log("Try to write body:")
                        if (defaults.DEBUG) console.log(postData)


                        const chunks = this.chunk(postData, this.MAX_SIZE)

                        for (let i = 0, len = chunks.length; i < len; i++) {
                            req.write(chunks[i])
                        }

                        if (defaults.DEBUG) console.log("Body written.")
                    }
                }
                if (defaults.DEBUG) console.log("Send request...")
                req.end()
                if (defaults.DEBUG) console.log("..done")


            } catch (err) {
                if (defaults.SHOWERRORS) console.error(err)
                reject({
                    status: 500,
                    message: "Error",
                    error: err
                })
            }
        })
    }
}