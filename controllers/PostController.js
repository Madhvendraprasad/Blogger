const path=require("path");
const PostModel=require("../models/PostModel")
const showHomePage=async(req,res)=>{
    const posts=await PostModel.find({}).sort({createdAt:"desc"});
    res.render("index",{posts:posts});
}
const createPost=(req,res)=>{
  res.render("create_post");
}
const storePost=async(req,res)=>{
    try {
        const {image}=req.files;
        await image.mv(path.resolve(__dirname,"..", "public/posts",image.name));
        await PostModel.create({
            ...req.body,
            image:'/posts/'+image.name,
        });
        console.log(req.body);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}
const showPost=async(req,res)=>{
    const post=await PostModel.findById(req.params.id);
    res.render("post",{post:post});
}

module.exports={
    showHomePage,
    createPost,
    storePost,
    showPost
}