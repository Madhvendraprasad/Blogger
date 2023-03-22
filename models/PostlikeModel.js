const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PostlikeSchema=new Schema({
 post_id:{
    type:Schema.ObjectId,
    ref:"Post"
 },
 user_id:{
    type:Schema.ObjectId,
    ref:"User"
 },

   
});
const Postlike=mongoose.model("Postlike",PostlikeSchema);
module.exports=Postlike;