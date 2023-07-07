import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";
import Post from "./models/Post.js";
import User from "./models/User.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const uploads = multer({dest: 'uploads/'});

const app = express();
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mdb")
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mdb offline")
})
mongoose.connection.on("connected", () => {
    console.log("mdb online")
})

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));


app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const userDoc = await User.create({
            username,
            password: hash});
        res.json(userDoc);
    } catch(err){
        res.status(400).json(err)
    }
})

app.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const userDoc = await User.findOne({username})
        const isPass = await bcrypt.compareSync(password, userDoc.password)
        if(isPass) {
            jwt.sign({ username, id:userDoc._id}, process.env.JWT, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json({                    
                    username,
                    id: userDoc._id
                })
            })
            
        }else{
            res.status(400).json("Wrong credentials")
        }
    }catch(err){
        res.status(400).json(err)
    }
})

app.post('/logout', (req, res) => {
    res.cookie("token", "").json("ok")
})

app.get('/post', async (req,res) => {
    res.json(
        await Post.find()
            .populate("author", ["username"])
            .sort({createdAt: -1})
            .limit(20)
            );
});

app.post('/post', uploads.single("file"), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT, {}, async (err, info) => {
        if(err) throw err;
        const {title, summary, badge, content} = req.body;
        const postDoc = await Post.create({
            title,
            author: info.id,
            summary,
            badge,
            content,
            cover:newPath
        });
        res.json(postDoc);
    });     
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

app.get("/post/:id", async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
})

app.put('/post', uploads.single("file"), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT, {}, async (err,info) => {
      if (err) throw err;
      const {id, title, summary, badge, content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("Not the author");
      }
      await postDoc.update({
        title,
        summary,
        badge,
        content,
        cover: newPath ? newPath : postDoc.cover
      });
  
      res.json(postDoc);
    });  
  });

app.listen(5000, () => {
    connect();
    console.log("Server running")
}); 