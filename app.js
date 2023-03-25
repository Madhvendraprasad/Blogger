require('dotenv').config()
const express=require("express");
const app=express();
const expressFileuplode=require("express-fileupload");
const methodOverride=require("method-override")

const auth_if_logged_in=require("./middlewares/auth_if_logged_in");
const auth_if_logged_out=require("./middlewares/auth_if_logged_out");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User=require("./models/UserModel");

const edge=require("edge-js");
const {showHomePage,createPost, storePost, showPost,geteditPost,editPost,deletePost,storelike}=require("./controllers/PostController");


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'))
app.use(express.json());
app.use(expressFileuplode());
app.use(methodOverride('_method'))

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
const {createUser,storeUser,showLoginPage,loginUser, logoutUser,profile,storeunfollower,storefollower}=require("./controllers/UserController");
app.get("/auth/register",auth_if_logged_out,createUser);
app.post("/auth/register",storeUser);
app.get("/",auth_if_logged_out,showLoginPage);
app.post("/auth/login",loginUser);
app.get("/auth/Logout",auth_if_logged_in,logoutUser);
app.get("/auth/home",auth_if_logged_in,showHomePage);
app.get("/auth/profile/:id",auth_if_logged_in,profile)
app.put("/auth/follow/:id",auth_if_logged_in,storefollower);
app.put("/auth/unfollow/:id",auth_if_logged_in,storeunfollower);


app.get("/posts/new",auth_if_logged_in,createPost);  
app.post("/posts/store", storePost);
app.get("/posts/:id",auth_if_logged_in, showPost);
app.get("/post/edit/:id",auth_if_logged_in,geteditPost);
app.put("/post/edit/:id",auth_if_logged_in,editPost)
app.delete("/post/:id",auth_if_logged_in,deletePost);
app.post("/post/like/:id",auth_if_logged_in,storelike);


const {showgroups,showcreateGroup,createGroup,showspecificgroup}=require("./controllers/GroupController");

app.get("/auth/groups",auth_if_logged_in,showgroups);
app.get("/auth/groups/create",auth_if_logged_in,showcreateGroup);
app.post("/auth/groups/create",auth_if_logged_in,createGroup);
app.get("/auth/groups/:id",auth_if_logged_in,  showspecificgroup);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})