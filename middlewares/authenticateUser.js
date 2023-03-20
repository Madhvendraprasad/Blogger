// const User=require("../models/UserModel");

// const authenticateUser=async(req,res,next)=>{
//     if(req.session.userid){
//          const user=await User.findById(req.session.userid);
//          if(user){
//             console.log(user);
//             res.redirect("/");
         
//          }else{
//            next();
//          }
//     }else{
//       next();
//     }
// };
// module.exports={authenticateUser};