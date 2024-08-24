import express from 'express'
import bodyParser from 'body-parser'

const app= express()
const port=3000
app.use(bodyParser.urlencoded({extended:true}))

app.listen(port, ()=>{
    console.log("Server up and listening...")
})

app.get('/', (req,res)=>{
    res.render("index.ejs")
})