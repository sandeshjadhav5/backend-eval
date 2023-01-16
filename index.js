const express=require("express")
const {  connection } = require("./configs/db")
require("dotenv").config()
const {userRouter}=require("./routes/User.routes")
const {postsRouter}=require("./routes/Posts.routes")
const {authenticate}=require("./middlewares/Authenticate.middleware")

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
  res.send("Welcome to Social Media App")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postsRouter)


app.listen(process.env.port,async()=>{
  try{
    await connection
    console.log("connected to the DB")
  }catch(err){
    console.log(err)
  }
  console.log(`server running at port:${process.env.port}`)
})