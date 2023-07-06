import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const userDoc = await User.findOne({username})
        const isPass = await bcrypt.compareSync(password, userDoc.password)
        if(isPass) {
            jwt.sign({ username, id:userDoc._id}, process.env.JWT, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({                    
                    username,
                    id: userDoc._id,
                })
            })
            
        }else{
            res.status(400).json("Wrong credentials")
        }
    }catch(err){
        res.status(400).json(err)
    }
}

export const logout = (req, res) => {
    res.cookie('token', '').json("ok")
}

export const profile = (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT, {}, (err, info) => {
        if(err) throw err;
        res.json(info)
    });    
};