import express from 'express'
import bodyParser from 'body-parser'

const app= express()
const port=3000
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const blogNames=["Dine with me", "Learn to Love", "Get ready fast", "Learn all day everyday"]
const blogWords=["Dine with me today please", "Learn to Love", "Get ready fast", "Learn all day everyday"]

function formatMyBlogName(blogName){
    return blogName.replaceAll(" ","-").toLowerCase();
}

function createUrlForBlog(blogPath, blogTitle, blog){
    app.get("/"+blogPath,(req,res)=>{
        res.render("blog.ejs",{blogName:blogTitle, blog:blog})
 })
}

app.get('/', (req,res)=>{
    res.render("index.ejs", {blogNames:blogNames})
})

for(let i=0;i<blogNames.length;i++){
    const blogTitle=blogNames[i]
    const blogPath=formatMyBlogName(blogTitle)
    const blog =blogWords[i]
    createUrlForBlog(blogPath,blogTitle,blog)
}

app.post('/submit', (req,res)=>{
    if(!(req.body.title)){
        alert("Blog must have a title!")
    }
    else if(!(req.body.blog)){
        alert("Blog is empty!")
    }
    else{
        const blogName= req.body.title
        const blogPath=formatMyBlogName(req.body.title)
        const blog= req.body.blog
        blogNames.push(req.body.title)
        blogWords.push(req.body.blog)
        createUrlForBlog(blogPath, blogName, blog)
        res.redirect("/")

    }
})

app.listen(port, ()=>{
    console.log("Server up and listening...")
})
