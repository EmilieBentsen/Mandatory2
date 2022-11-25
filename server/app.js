import dotenv from "dotenv/config"
import express from "express"
const app = express()

import helmet from "helmet"
app.use(helmet())

import session from "express-session"
app.set("trust proxy", 1)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: 
    { 
      domain: 'localhost',
      secure: false,
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: false 
    }
  })
);

app.use(express.json())


import cors from "cors"
app.use(cors({
    origin: "https://mandatory2.herokuapp.com",
    credentials: true,
  }));

import usersRouter from "./routers/usersRouter.js"
app.use(usersRouter)

app.listen(process.env.PORT || 8080, () => console.log("Server is running on port"))
