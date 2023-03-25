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
            const posts=await PostModel.find({}).sort({likes:"desc",createdAt:"desc"});
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
   
   
    const cursesuser=await User.findOne({_id:req.session.user});
    
    try {
        const userData = await User.findOne({_id:req.params.id});
        [...userData.followers].forEach(function(followers){
            console.log(followers)
            if(followers===cursesuser._id)
            {
                follower=1;
            }
        })
        
        if(!userData)
        {
            console.log("No User found");
        }else{
            try {
                const userPosts=await PostModel.find({User_Id:req.params.id});
                if(userPosts.length)
                {
                    console.log("yes Have Posts");
                    console.log(userPosts);
                    console.log(userPosts[0]._id);
                    console.log(userPosts[0].User_Id);
                    console.log(userPosts[0].image);
                    console.log(userPosts[0].username);
                    console.log(userData);
                    console.log(userData._id);
                    console.log(req.session.user);
                    console.log(cursesuser._id);

                    console.log("mad");
                    console.log(userData._id);
                    console.log(cursesuser._id);
                   
                    res.render("profile",{userData:userData,userPosts:userPosts,cursesuser:cursesuser,follower:"0"});
                }
                else{
                    console.log("Don't have Post");
                
                    res.render("profile",{userData:userData,userPosts:userPosts,cursesuser:cursesuser,follower:"0"});
                } 
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err);
    }
   
    
    
   
}
const storefollower=(req,res)=>
{
  User.updateOne(req.params.id,{
    $push:{followers:req.session.id}
   },{
    new:true
   },function(err,result){
    if(err)
    {
        console.log(err);
    }
    else{
       User.updateOne(req.session.user,{
            $push:{following:req.params.id}
        },{new:true},function(err,result){
            if(err)
            {
                console.log(err);
            }
            else{
                res.redirect("/auth/profile/"+req.params.id);
            }
        });
    }
   });
 
   
  }
  const storeunfollower=(req,res)=>
{
  User.updateOne(req.params.id,{
    $pull:{followers:req.session.id}
   },{
    new:true
   },function(err,result){
    if(err)
    {
        console.log(err);
    }
    else{
       User.updateOne(req.session.user,{
            $pull:{following:req.params.id}
        },{new:true},function(err,result){
            if(err)
            {
                console.log(err);
            }
            else{
                res.redirect("/auth/profile/"+req.params.id);
            }
        });
    }
   });
 
   
  }
//   const storeunfollower=async(req,res)=>
// {
//   const user=await User.UpdateOne(req.params.id,{
//     $pull:{followers:req.session.id}
//    },{
//     new:true
//    });
//    if(user){
//     await User.UpdateOne(req.session.user,{
//         $pull:{following:req.params.id}
//     },{new:true});
//     res.redirect("/auth/profile/"+req.params.id);
//     }
//    else{
//   console.log("user not found");
//    }
   
//   }
// const storeunfollower=async(req,res)=>
// {
//    User.findByIdAndUpdate(req.params.id,{
//     $pull:{followers:req.session.user}
//    },{
//     new:true
//    }(result=>{
//     User.findByIdAndUpdate(req.session.user,{
//         $pull:{following:req.params.id}
//     },{new:true}).then(result=>{
//         res.render()
//     }).catch(err=>{
//         console.log(err);
//     })
//   }).catch(err=>{
//     console.log(err);
//    })
// })
   
 
// }
// const storeunfollower=async(req,res)=>
// {
//    User.findByIdAndUpdate(req.params.id,{
//     $pull:{followers:req.session.id}
//    },{
//     new:true
//    })(result=>{
//     User.findByIdAndUpdate(req.session.user,{
//         $pull:{following:req.params.id}
//     },{new:true}).then(result=>{
//         res.render()
//     }).catch(err=>{
//         console.log(err);
//     })
//    }).catch(err=>{
//         console.log(err);
//     })
 
// }


module.exports={
    createUser,
    storeUser,
    showLoginPage,
    loginUser,
    logoutUser,
    profile,
    storeunfollower,
    storefollower,
}