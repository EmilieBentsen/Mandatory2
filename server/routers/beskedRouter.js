import { Router } from "express"
const router = Router()
import db from "../database/connection_mysql.js"

router.get("/api/fetchReceiver", async (req, res) => {
    if(req.session.receiver === undefined){
        req.session.receiver = ''
    }
    res.send({ receiver: req.session.receiver })
}); 

router.post("/api/fetchReceiver", async (req, res) => {
    const email = req.body.useremail
    req.session.receiver = email
    res.send({ data: ''});    
    
});

router.get("/api/fetchMessages", async (req, res) => {
    const [data, rows] = await db.query("SELECT * FROM messages WHERE userID=(SELECT id FROM users WHERE email= ?)", req.session.email)
    res.send({ data: data })
}); 

router.post("/api/sendMessage", async (req, res) => {
    const receiver = req.body.receiver
    const message = req.body.message
    const sender = req.session.email
    const [users, fields] = await db.query(`SELECT * FROM users WHERE email = '${receiver}';`);
    const resultDB = await db.query(`INSERT INTO messages (message, sender, userID) VALUES (?, ?, ?)`, [message, sender, users[0].id]);
    res.send({data: resultDB})
})

export default router