const request = require("../lib/httpRequest")
const User = require("../entities/User")
const { validate } = require("psy-tools")
const defaults = require("../lib/defaults")

module.exports = {
    login(credentials) {
        return new Promise((resolve, reject) => {
            try {
                if (credentials && credentials.id && credentials.password) {
                    request.request(request.POST, defaults.BASE + "/security/login", null, null, credentials)
                        .then(response => {
                            let user = new User(response)
                            resolve(user)
                        })
                        .catch(err => {
                            let message
                            switch (err.status) {
                                case 401:
                                    message = "User not found or wrong credentials"
                                    break
                                case 403:
                                    messaage = "User not active"
                                    break
                                default:
                                    message = "Error when logging in"
                            }
                            reject({
                                status: err.status,
                                message: message
                            })
                        })
                } else {
                    throw {
                        status: 400,
                        message: "Credentials missing or incomplete."
                    }
                }
            } catch (err) {
                reject(err)
            }
        })
    },
    register(user, account, path) {
        return new Promise((resolve, reject) => {
            if (user && user._validate && user._validate()) {
                if (account && account._validate && account._validate(true)) {
                    let postData = {
                        user: user.toJson(),
                        account: account.toJson()
                    }
                    request.request(request.POST, defaults.BASE + "/security/register", null, { path: path }, postData)
                        .then((data) => {
                            resolve(defaults.DEBUG ? data : null)
                        })
                        .catch(err => {
                            let message = err.status === 422
                                ? "The user already exists, no new account has been created"
                                : "Error register new user an acccount"
                            reject({
                                status: err.status,
                                message: message
                            })
                        })
                } else {
                    reject({
                        status: 400,
                        message: "Account fields missing or incomplete"
                    })
                }
            } else {
                reject({
                    status: 400,
                    message: "User fields missing or incomplete"
                })
            }
        })

    },
    passwordResetToken(user) {
        return new Promise((resolve, reject) => {
            if (user) {
                let id = typeof user === "object" ? user.id : user
                request.request(request.GET, defaults.BASE + "/security/reset/sendtoken", null, { id: id })
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        console.log(err.status)
                        let message
                        switch (err.status) {
                            case 403:
                                message = "User is not ective, the password token was not sent"
                                break
                            case 203:
                                message = "User not verified, the password token was not sent"
                                break
                            case 401:
                                message = "The user could not be found, the password token was not sent"
                                break
                            default:
                                message = "The password token was not sent"
                        }
                        reject({
                            status: err.status,
                            message: message
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "Please pass a user or an user ID first"
                })
            }
        })
    },

    resetPassword(token) {
        return new Promise((resolve, reject) => {
            if (token) {
                request.request(request.GET, defaults.BASE + "/security/reset/password", null, { token: token })
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        let message
                        switch (err.status) {
                            case 401:
                                message = "User not found, the password has not been reset"
                                break
                            case 403:
                                message = "The token is wrong or invalid, the password has not been reset"
                                break
                            default:
                                message = "Error when resetting the password"
                        }
                        reject({
                            status: err.status,
                            message: message
                        })
                    })
            } else {
                reject({
                    status: 400,
                    message: "Please enter a token first"
                })
            }
        })
    },
    changePassword(user, oldPassword, newPassword) {
        return new Promise((resolve, reject) => {
            if (user && oldPassword && newPassword) {
                if (!validate.isEmail(typeof user === "object" ? user.id : user)) {
                    reject({
                        status: 412,
                        message: "Not a valid email address"
                    })
                } else if (oldPassword.toLowerCase() === newPassword.toLowerCase()) {
                    reject({
                        status: 406,
                        message: "Old and new password must not be identical"
                    })
                } else if (!validate.isPasswordStrength(newPassword)) {
                    reject({
                        status: 417,
                        message: "The new password is not strong enough"
                    })
                } else {
                    let postData = {
                        uid: typeof user === "object" ? user.id : user,
                        oldPwd: oldPassword,
                        newPwd: newPassword
                    }
                    request.request(request.POST, defaults.BASE + "/security/change/password", null, null, postData)
                        .then(() => {
                            resolve()
                        })
                        .catch(err => {
                            let message
                            switch (err.status) {
                                case 412:
                                    message = "Old password does not match the user password"
                                    break
                                case 404:
                                    message = "User not found"
                                    break
                                default: "Error while change password, password not changed"
                            }
                            reject({
                                status: err.status,
                                message: message
                            })
                        })
                }

            } else {
                reject({
                    status: 400,
                    message: "One or more parameters missing"
                })
            }
        })
    },
    generatePassword(user) {
        return new Promise((resolve, reject) => {
            if (user) {
                if (!validate.isEmail(user instanceof User ? user.id : user)) {
                    reject({
                        status: 412,
                        message: "Not a valid email address"
                    })
                } else {
                    let id = typeof user === "object" ? user.id : user
                    request.request(request.GET, defaults.BASE + "/security/generate/password", null, { uid: id })
                        .then(pwd => {
                            resolve(pwd.password)
                        })
                        .catch(err => {
                            let message
                            switch (err.status) {
                                case 404:
                                    message = "User not found"
                                    break
                                default:
                                    message: "An error occurs, no new password generated"
                                    break
                            }

                            reject({
                                status: err.status,
                                message: message
                            })
                        })
                }
            } else {
                reject({
                    status: 400,
                    message: "Please pass a user or an user ID first"
                })
            }
        })

    }
}