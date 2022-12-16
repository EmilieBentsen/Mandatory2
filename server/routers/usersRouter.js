import { Router } from "express"
const router = Router();
import db from "../database/connection_mysql.js"
import bcrypt from "bcryptjs"
import rateLimit from "express-rate-limit"
import { sendEmail } from "../mail_service/send_mail.js"


const generalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 80
});

router.use(generalLimiter);

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 6, // Limit each IP to 6 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post("/api/login", loginLimiter, async (req, res) => {
    const email = req.body.useremail
    const password = req.body.userpass
    const [data, fields] = await db.query("SELECT * FROM users;");
    const emailMatch = data.filter(user => user.email === email)

    if(emailMatch.length === 1){
        const passwordMatch = await bcrypt.compare(password, emailMatch[0].password)
        if(passwordMatch){
            req.session.loggedIn = 'yes'
            req.session.email = email
        }
        else{
            req.session.loggedIn = 'no'
            req.session.email = ''

        }
    } else {
    }

    res.send({ loggedIn: req.session.loggedIn })    
    
});

router.get("/api/loggedIn", async (req, res) => {
    if(req.session.loggedIn === undefined){
        req.session.loggedIn = 'no'
    }
    res.send({ loggedIn: req.session.loggedIn })
}); 

router.get("/api/email", async (req, res) => {
    if(req.session.email === undefined){
        req.session.email = ''
    }
    res.send({ email: req.session.email })
}); 

router.get("/api/receiver", async (req, res) => {
    if(req.session.receiver === undefined){
        req.session.receiver = ''
    }
    res.send({ receiver: req.session.receiver })
}); 

router.post("/api/receiver", async (req, res) => {
    const email = req.body.useremail
    req.session.receiver = email
    res.send({ data: ''});    
    
});

router.get("/api/messages", async (req, res) => {
    
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

router.post("/api/logout", async (req, res) => { 
    req.session.loggedIn = req.body.loggedIn
    res.send({ loggedIn: req.session.loggedIn })
}); 

router.post("/api/signup", async (req, res) => {
    const email = req.body.useremail
    const password = req.body.userpass
    const [users, fields] = await db.query("SELECT * FROM users;");
    const emailMatch = users.filter(user => user.email === email)

    let tryAgain = null;

    if(emailMatch.length === 0){
        const salt = await bcrypt.genSalt(15)
        const newHashedPassword = await bcrypt.hash(password, salt)
        const resultDB = await db.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, newHashedPassword]);
        tryAgain = false;
        sendEmail(email, "Thank you for signing up!", "We are so happy that you want to be a part of klimateket!")
    } else {
        tryAgain = true;
    }
    
    res.send({ tryAgain: tryAgain});    
    
});

export default router;