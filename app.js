require('dotenv').config()
const express=require("express");
const app=express();
const expressFileuplode=require("express-fileupload");


const auth_if_logged_in=require("./middlewares/auth_if_logged_in");
const auth_if_logged_out=require("./middlewares/auth_if_logged_out");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User=require("./models/UserModel");

const edge=require("edge-js");
const {showHomePage,createPost, storePost, showPost}=require("./controllers/PostController");


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'))
app.use(express.json());
app.use(expressFileuplode());


app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/BLOG_WEB",
    }),
}));

const db=require("./db");

// app.use("*",async(req,res,next)=>{
//     const {userId}=req.session;
//     console.log(req.session);
//     if(userId)
//     {
//         const userId=req.session.userId;
//         const user=await User.findById(userId);
//         app.locals.user=user;
//         app.locals.userId=userId;
//         res.render("header",{userID:userId});
//     }
   
//     next();
// });
const {createUser,storeUser,showLoginPage,loginUser, logoutUser}=require("./controllers/UserController");
app.get("/auth/register",auth_if_logged_out,createUser);
app.post("/auth/register",storeUser);
app.get("/auth/login",auth_if_logged_out,showLoginPage);
app.post("/auth/login",loginUser);
app.get("/auth/Logout",auth_if_logged_in,logoutUser);
app.get("/",auth_if_logged_in,showHomePage);

app.get("/posts/new",auth_if_logged_in,createPost);  
app.post("/posts/store", storePost);
app.get("/posts/:id",auth_if_logged_in, showPost);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})