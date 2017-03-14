var express= require ('express');
var app =express();
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var dbase= 'mongodb://localhost/library';
var blog= require('./blog.js');

mongoose.connect(dbase);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get ('/', function (req,res){
    res.end('hello to my blog');
});
app.get('/blog',function(req,res){
    blog.find()
    .exec(function(err,blog){
        if(err){
            console.log("not conection ");
        }else {
            res.json(blog);
        }
    })
})
app.post('/blog',function(req,res){
    var newBlog= new blog();
    newBlog.title= req.body.title;
    newBlog.author= req.body.author;
    newBlog.text= req.body.text;
    newBlog.save(function(err,blog){
        if(err){
            console.log('error');
        }else{
            res.json(blog);
        }
    })
})


app.put('/blog/:id',function(req,res){
    blog.findOneAndUpdate({
        _id:req.params.id},{$set:{title: req.body.title, author: req.body.author, text:req.body.text}}
    ).exec(function(err,blog){
        if(err){
            console.log('error');
        }else{
            console.log('update db');
            res.json(blog);
        }
    })

})
app.delete('/blog/:id',function(req,res){
    blog.findOneAndRemove({
        _id:req.params.id},function(err,blog){
            if(err){
                console.log('error');
                res.send('error deleting')
            }else{
                console.log('deleted');
                res.json(blog);
             }

    })
})
var port =8080;

app.listen(port, function(){

    console.log(`listen to port  ${port}`);
});
