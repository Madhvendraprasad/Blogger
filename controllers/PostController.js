const path=require("path");
const PostModel=require("../models/PostModel")
const UserModel=require("../models/UserModel");

const PostlikeModel=require("../models/PostlikeModel");
const showHomePage=async(req,res)=>{
    const posts=await PostModel.find({}).sort({likes:"desc",createdAt:"desc"});
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
    res.render("edit_post",{post:post,user:user});
}
const editPost=async(req,res)=>{
    const {image}=req.files;
    const user=await UserModel.findById({_id:req.session.user});
    
    
    await image.mv(path.resolve(__dirname,"..", "public/posts",image.name));
    await PostModel.create({
        ...req.body,
        image:'/posts/'+image.name,
        username:user.username,
    });
    await PostModel.findByIdAndDelete(req.params.id);
   
   
    
   
     
    // console.log(req.body);
    res.redirect("/auth/home");

}
const deletePost=async(req,res)=>{
    await PostModel.findByIdAndDelete(req.params.id);
    res.redirect("/auth/home");
}
const storelike=async(req,res)=>{
  const curpost_id=req.params.id;
  const curuser_id=req.session.user;
    
  PostModel.findOne({_id:curpost_id}).then(async(blog)=>{
    if(!blog)
    {
        console.log("No blog found");
    }
    else{
        PostlikeModel.findOne({
            post_id:curpost_id,
            user_id:curuser_id
        }).then(async(Postlike)=>{
           if(!Postlike)
           {
            let PostlikeDoc=new PostlikeModel({
                post_id:curpost_id,
                user_id:curuser_id
            });
          let likeData=await PostlikeDoc.save();
          await PostModel.updateOne({
            _id:curpost_id
         },{
            $push:{likes:likeData._id}
         })
          
          res.redirect("/posts/"+req.params.id);
        }
        else{
            await PostlikeModel.deleteOne({
                _id:Postlike._id
            });
            await PostModel.updateOne({
                _id:Postlike.post_id
            },{
                $pull:{likes:Postlike._id}
            })
            res.redirect("/posts/"+req.params.id);
        }

        }).catch((err)=>{
            console.log(err);
        })
    }

  })
    
     
    
 
    
}

module.exports={
    showHomePage,
    createPost,
    storePost,
    showPost,
    geteditPost,
    editPost,
    deletePost,
    storelike,
   
    
}