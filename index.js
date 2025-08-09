const express = require('express')
const mongoose = require('mongoose')
const postRoute = require('./routes/post.routes.js')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes.js')
const coockieParser = require("cookie-parser")
let app = express()
app.use(fileUpload({}))
app.use(coockieParser({}))
app.use(express.static('static'))
app.use(express.json())
require('dotenv').config()

app.use('/post', postRoute)
app.use('/auth', authRouter)


let DB_URL = process.env.MONGO_DB_URL
let PORT = process.env.PORTN || 1111
const startUp = async ()=>{
    try{
        await mongoose.connect(DB_URL).then(()=> console.log('Connect DB'))
        app.listen(PORT, ()=>{console.log(`Localhost created on http://localhost:${PORT}`);})
    }catch(error){
        console.log(`Error message : ${error}`);
    }
}

startUp()
