import dotenv from "dotenv/config"
import express from "express"
import http from "http"
import {Server} from "socket.io"
const app = express()

const server = http.createServer(app)
const io = new Server(server,   {cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }})

io.on("connection", (socket) => {

    socket.on("send text", (data) => {
      io.emit("update text", data)
    })
    socket.on("client chooese a new color", (data) => {
      socket.emit("update the color", data)
    })
    socket.on("send ice", (data) => {
      socket.emit("update the ice", data)
    })
  
})

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

import bodyParser from "body-parser"
app.use(bodyParser.json())

import cors from "cors"
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

import brugerRouter from "./routers/brugerRouter.js"
app.use(brugerRouter)

import debatRouter from "./routers/debatRouter.js"
app.use(debatRouter)

import beskedRouter from "./routers/beskedRouter.js"
app.use(beskedRouter)

import emailRouter from "./routers/emailRouter.js"
app.use(emailRouter)



const PORT = 8080 || process.env.PORT
server.listen(PORT, () => console.log("Server is running on port", PORT))
