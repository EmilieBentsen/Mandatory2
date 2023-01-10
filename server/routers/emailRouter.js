import { Router } from "express"
const router = Router()
import { sendContactEmail } from "../mail_service/send_mail.js"

router.get("/api/fetchEmail", async (req, res) => {
    if(req.session.email === undefined){
        req.session.email = ''
    }
    res.send({ email: req.session.email })
}); 

router.post("/api/sendContactEmail", async (req, res) => {
    const sender = req.session.email
    const message = req.body.message
    sendContactEmail(sender, message)
    res.send({data: ""})
})

export default router