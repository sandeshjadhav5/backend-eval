const express=require("express")
const {PostModel}=require("../models/Posts.model")

const postsRouter=express.Router()


// G  E  T
postsRouter.get("/",async(req,res)=>{
try{
const posts=await PostModel.find()
res.send(posts)
}catch(err){
  console.log(err)
}
})


//P  O  S  T
postsRouter.post("/createpost",async(req,res)=>{
  const payload=req.body

  try{
    const newPost=new PostModel(payload)
    await newPost.save()
    res.send("Post Created Successfully")
  }catch(err){
    console.log(err)
    res.send("Failed to Create post")
  }
})

// P  A  T  C  H
postsRouter.patch("/update/:id",async(req,res)=>{
  const payload=req.body
  const id=req.params.id
  const post=await PostModel.find({_id:id})
  const userID_in_post=post[0].userID
  const userID_making_req=req.body.userID_in_post

  try{
    if(userID_making_req!==userID_in_post){
      res.send({"msg":"No Authorization"})
    }else{
      await PostModel.findByIdAndUpdate({_id:id},payload)
      res.send("post Updated")
    }
  }catch(err){
    console.log(err)
    res.send("Error While Updating")
  }

})

module.exports={
  postsRouter
}