import mongoose from "mongoose";

const {Schema} = mongoose;
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 2,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
},
 {timestamps: true}
 );

export default mongoose.model("User", UserSchema);