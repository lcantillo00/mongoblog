var mongoose= require('mongoose');
var schema= mongoose.Schema;
var blogSchema= new schema ({
    title: String,
    author:String,
    text: String
});
module.exports=mongoose.model('blog', blogSchema)
