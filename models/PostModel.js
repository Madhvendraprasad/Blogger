const mongoose=require("mongoose");
const UserModel=require("./UserModel");
const Schema=mongoose.Schema;
const PostSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
likes:[{type:Schema.ObjectId,ref:"Postlike"}],
User_Id:{
    type:Schema.ObjectId,
    ref:"User"
},

   
});
const Post=mongoose.model("Post",PostSchema);
module.exports=Post;