const PostModel=require("../models/PostModel")
const UserModel=require("../models/UserModel");
const GroupModel=require("../models/GroupModel");


const showgroups=async(req,res)=>{
  const groups=await GroupModel.find({});
  res.render("group",{groups:groups});
}
const showcreateGroup=async(req,res)=>{
    res.render("create_group");
}
const createGroup=async(req,res)=>{
    const group = new GroupModel(req.body);
    await group.save();
    res.redirect("/auth/groups");
}
const showspecificgroup=async(req,res)=>{
    const group=await GroupModel.findById({_id:req.params.id});
    res.render("specific_group",{group:group});

}
module.exports={
    showgroups,
    createGroup,
    showcreateGroup,
    showspecificgroup,
}