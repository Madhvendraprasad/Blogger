const bcrypt=require("bcrypt");
const User=require("../models/UserModel");
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
    const user=await User.findOne({email});
    if(user){
        const result=await bcrypt.compare(password,user.password);
        if(result){
            req.session.user=user._id;
            // res.session.save(function(err){
            //     if(err)return next(err);
            //   
            // })
            res.redirect("/");
        
        }else{
            res.redirect("/auth/login");
        }
    }
    else{
        res.redirect("/auth/login");
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


module.exports={
    createUser,
    storeUser,
    showLoginPage,
    loginUser,
    logoutUser,
}