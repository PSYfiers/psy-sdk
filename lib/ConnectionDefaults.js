module.exports = class Defaults {
    set PROTOCOL(protocol) {
        this._protocol = protocol
    }

    get PROTOCOL() {
        return this._protocol ? this._protocol : "https"
    }

    set HOSTNAME(hostname) {
        this._hostname = hostname
    }

    get HOSTNAME() {
        return this._hostname
    }

    set PORT(port) {
        this._port = port
    }

    get PORT() {
        return this._port ? this._port : 443
    }

    set BASE(base) {
        this._base = base
    }

    get BASE() {
        return this._base ? this._base : "/core"
    }

    set NT(nt) {
        this._nt = nt
    }

    get NT() {
        return typeof this._nt === "undefined" ? false : this._nt
    }

    set SHOWERRORS(showerrors) {
        this._showerrors = showerrors
    }

    get SHOWERRORS() {
        return typeof this._showerrors === "undefined" ? false : this._showerrors
    }

    set DEBUG(debug) {
        this._debug = debug
    }

    get DEBUG() {
        return this._debug
    }

    get supportedLanguages() {
        return ["de", "en", "fr", "it"]
    }

    get supprtedSalutations() {
        return {
            de: [
                "Herr",
                "Frau"
            ],
            fr: [
                "Monsieur",
                "Mme."
            ],
            it: [
                "Signor",
                "Signora"
            ],
            en: [
                "Mr.",
                "Mrs."
            ]
        }
    }
}