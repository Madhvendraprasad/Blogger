const mongoose=require("mongoose");
const db = (async ()=>{
   try {
    await mongoose.connect("mongodb://localhost:27017/BLOG_WEB",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("Database connected");
   } catch (error) {
    console.log(error);
   }
})();
module.exports=db;