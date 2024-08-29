import express from 'express'
import bodyParser from 'body-parser'

const port=80
const app= express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

var blogNames=["Controlling Anger", "Love Forms", "Palestine's Strength", "Mother's Love"]
var blogWords=["Controlling anger is simpler said than done. Unlike most emotions, this one can lead to drastic outcomes if not properly tugged in. It can get you to lose your job, relationship or worse. When feeling angry, breathe and don't take decisions until you've calmed down.",
     "Love comes in many forms like actions and words. Actions are louder than words, nonetheless, don't you ever forget that! A person who listens to your problems and makes time for you probably loves you than one that says they do but does nothing, don't you think?", "Get ready fast", "Learn all day everyday"]

function formatMyBlogName(blogName){
    return blogName.replaceAll(" ","-").replaceAll("'","-").toLowerCase();
}

function createUrlForBlog(blogPath, blogTitle, blog){
    app.get("/"+blogPath,(req,res)=>{
        res.render("blog.ejs",{blogName:blogTitle, blog:blog})
 })
}
app.get('/:blogPath', (req, res) => {
    const { blogPath } = req.params;
    const index = blogNames.findIndex(name => formatMyBlogName(name) === blogPath);
    
    if (index !== -1) {
        const blogTitle = blogNames[index];
        const blog = blogWords[index];
        res.render('blog.ejs', { blogName: blogTitle, blog: blog });
    } else {
        res.status(404).send('Blog not found');
    }
});

app.get('/', (req,res)=>{
    res.render("index.ejs", {blogNames:blogNames})
})


for(let i=0;i<blogNames.length;i++){
    const blogTitle=blogNames[i]
    const blogPath=formatMyBlogName(blogTitle)
    const blog =blogWords[i]
    console.log(blogPath)
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


app.post('/delete', (req, res) => {
    const { blogName } = req.body;
    var index=-1
    for(let i=0;i<blogNames.length;i++){
        if(blogNames[i]===blogName){
            index=i;
            break;
        }
    }
     blogNames = blogNames.filter(item => item !== blogName);
     blogWords= blogWords.filter(item => item!==blogWords[index])
     res.render("index.ejs",{blogNames: blogNames, blogWords: blogWords});

});

app.post('/edit', (req, res) => {
    const { blogName, editedBlog } = req.body;
    const index = blogNames.indexOf(blogName);
    blogWords= blogWords.map(item => {if(item!==blogWords[index]) return item; else return editedBlog })
    blogWords[index] = editedBlog;
    const blogPath=formatMyBlogName(blogName)
    createUrlForBlog(blogPath,blogName,editedBlog)
    res.render("index.ejs", { blogNames: blogNames});
 
});
