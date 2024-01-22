const https = require("https")
const fs = require("fs")
const events = require("events")
const defaults = require("./defaults")

module.exports = {
    queue: new Array(),
    init(listener) {
        const emitter = new events.EventEmitter()
        const fn = (req, res) => {
            if (req.method === "POST" && req.headers["content-type"] === "application/json") {
                let body = ""
                req.on("data", data => {
                    body += data
                })
                req.on("end", () => {
                    if (!listener) {
                        this.queue.push(JSON.parse(body))
                    }
                    emitter.emit("notification", JSON.parse(body))

                    res.writeHead(200)
                    res.end("done")
                })
            } else {
                res.writeHead(400)
                res.end("Bad request")
            }
        }

        if (listener) {
            emitter.addListener("notification", listener)
        }

        return https.createServer({
            key: fs.readFileSync(__dirname + "/key.pem"),
            cert: fs.readFileSync(__dirname + "/cert.pem")
        }, fn).listen(defaults.PUSH_PORT)
    }
}