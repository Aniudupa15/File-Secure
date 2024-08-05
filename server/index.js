const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const FileSecureModel=require("./models/File-Secure")

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/File-Secure")
.then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    
app.post ("/Login",(req,res)=>{
    const {Name,Password}=req.body;
    FileSecureModel.findOne({Name:Name})
    .then(user=>{
        if(user)
        {
            if(user.Password===Password)
                res.json("sucess")
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("no Record")
        }
    })
})

app.post ("/Button",(req,res)=>{
    const {Name,Password}=req.body;
    FileSecureModel.findOne({Name:Name})
    .then(user=>{
        if(user)
        {
            if(user.Password===Password)
                res.json("sucess")
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("no Record")
        }
    })
})


app.post('/register',(req,res)=>{
    FileSecureModel.create(req.body)
    .then(Users=>res.json(Users))
    .catch(err=>res.json(err))
})
app.listen(3001,()=>{
    console.log("server is running") 
})