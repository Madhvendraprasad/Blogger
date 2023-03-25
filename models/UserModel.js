const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    followers:[{
        type:Schema.ObjectId,
        ref:"User"
    }],
    following:[{
        type:Schema.ObjectId,
        ref:"User"
    }],

});
UserSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err){
            return next(err);
        }
        this.password=passwordHash;
        next();
    });
});
const User=mongoose.model("User",UserSchema);
module.exports=User;