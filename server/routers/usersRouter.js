import { Router } from "express"
const router = Router();
import db from "../database/connection_sqlite.js"
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
    console.log('Email: ' + email);
    const data = await db.all("SELECT * FROM users;")
    console.log('data: ' + data)
    const emailMatch = data.filter(user => user.email === email)

    if(emailMatch.length === 1){
        const passwordMatch = await bcrypt.compare(password, emailMatch[0].password)
        if(passwordMatch){
            req.session.loggedIn = 'yes'
        }
        else{
            req.session.loggedIn = 'no'
        }
    } else {
        console.log("email and password not in database")        
    }

    res.send({ loggedIn: req.session.loggedIn })    
    
});

router.get("/api/loggedIn", async (req, res) => {
    if(req.session.loggedIn === undefined){
        req.session.loggedIn = 'no'
    }
    console.log("test!!")
    res.send({ loggedIn: req.session.loggedIn })
}); 

router.post("/api/logout", async (req, res) => { 
    req.session.loggedIn = req.body.loggedIn
    res.send({ loggedIn: req.session.loggedIn })
}); 

router.post("/api/signup", async (req, res) => {
    const email = req.body.useremail
    const password = req.body.userpass
    
    const users = await db.all("SELECT * FROM users;")

    const emailMatch = users.filter(user => user.email === email)

    let tryAgain = null;

    if(emailMatch.length === 0){
        const salt = await bcrypt.genSalt(15)
        const newHashedPassword = await bcrypt.hash(password, salt)
        const resultDB = await db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, newHashedPassword]);
        
        tryAgain = false;
        sendEmail(email, "Thank you for signing up!", "We are so happy that you want to be a part of klimateket!")
    } else {

        tryAgain = true;
    }
    
    
    res.send({ tryAgain: tryAgain});    
    
});

export default router;