const path=require("path");
const PostModel=require("../models/PostModel")
const UserModel=require("../models/UserModel");
const showHomePage=async(req,res)=>{
    const posts=await PostModel.find({}).sort({createdAt:"desc"});
    const user=await UserModel.findById({_id:req.session.user});
    res.render("index",{posts:posts,user:user});
}
const createPost=async(req,res)=>{

    const user=await UserModel.findById({_id:req.session.user});
  res.render("create_post",{user:user});
}
const storePost=async(req,res)=>{
    try {
        const user=await UserModel.findById({_id:req.session.user});
        const {image}=req.files;
        const username=req.body.username;
        await image.mv(path.resolve(__dirname,"..", "public/posts",image.name));
        await PostModel.create({
            ...req.body,
            image:'/posts/'+image.name,
            username:user.username,
        });
        console.log(req.body);
        res.redirect("/auth/home");
    } catch (error) {
        console.log(error);
    }
}
const showPost=async(req,res)=>{
    const post=await PostModel.findById(req.params.id);
    const user=await UserModel.findById({_id:req.session.user});
    res.render("post",{post:post,user:user});
}
const geteditPost=async(req,res)=>{
    let post=await PostModel.findById(req.params.id);
    const user=await UserModel.findById({_id:req.session.user});
    res.render("create_post",{post:post,user:user});
}
const editPost=async(req,res)=>{
    let post=await PostModel.findById(req.param.id);
    const user=await UserModel.findById({_id:req.session.user});
    const {image}=req.files;
    const username=req.body.username;
    await image.mv(path.resolve(__dirname,"..", "public/posts",image.name));
    await PostModel.create({
        ...req.body,
        image:'/posts/'+image.name,
        username:user.username,
    });
    console.log(req.body);
    res.redirect("/auth/home");

}
const deletePost=async(req,res)=>{
    await PostModel.findByIdAndDelete(req.params.id);
    res.redirect("/auth/home");
}
module.exports={
    showHomePage,
    createPost,
    storePost,
    showPost,
    geteditPost,
    editPost,
    deletePost,
}