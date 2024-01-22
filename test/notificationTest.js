/*
require("./init")

const { Participant } = require("../index")


describe("Notification tests", () => {
    it("recieve notification", async () => {
        try {
            let participant = new Participant()
            let notificationService = await participant.subscribe("https://127.0.0.1:3000")
            if (notificationService) {
                notificationService.init(data => {
                    console.log(data)
                })
            }

            await participant._triggerNotification()

            await participant.unsubscribe("https://localhost:3000")
        } catch (err) {
            console.error(err)
        }
    })
})

*/