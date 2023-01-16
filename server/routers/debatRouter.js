import { Router } from "express"
const router = Router()
import db from "../database/connection_mysql.js"


router.post("/api/writePost", async (req, res) => {
    const post = req.body.post
    const writer = req.session.email
    console.log("post: " + post)
    console.log("writer: " + writer)
    const resultDB = await db.query(`INSERT INTO posts (post, writer) VALUES (?, ?)`, [post, writer])
    res.send({data: resultDB})
})

router.get("/api/fetchPosts", async (req, res) => {
    const [data, rows] = await db.query("SELECT * FROM posts")
    console.log(data)
    res.send({ data: data })
})

export default router