const bcrypt=require("bcrypt");
const User=require("../models/UserModel");

const PostModel=require("../models/PostModel")
const createUser=(req,res)=>{
    res.render("create_user");
};
const storeUser=async(req,res)=>{
   try {
    await User.create({
        ...req.body
    });
    res.redirect("/");
    
   } catch (error) {
    console.log(error);
   }
};
const showLoginPage=(req,res)=>{
    res.render("login");
}
const loginUser=async(req,res)=>{
   try {
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(user){
        const result=await bcrypt.compare(password,user.password);
        if(result){
            req.session.user=user._id;
            const posts=await PostModel.find({}).sort({createdAt:"desc"});
            // res.session.save(function(err){
            //     if(err)return next(err);
            //   
            // })
            // res.redirect("/");
            res.render("index",{user:user,posts:posts});
        
        }else{
            res.redirect("/");
        }
    }
    else{
        res.redirect("/");
    }
   } catch (error) {
    console.log(error);
   }
   
};
const logoutUser=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/");
    })
};

const profile = async (req,res)=>{
    const id = req.session.user;
    const userData = await User.findOne({_id:id});
    const userPost=await PostModel.find({username:userData.username});
    
    res.render("profile",{user:userData,userPost:userPost});
}


module.exports={
    createUser,
    storeUser,
    showLoginPage,
    loginUser,
    logoutUser,
    profile,
}