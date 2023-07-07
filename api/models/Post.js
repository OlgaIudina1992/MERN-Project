import mongoose from "mongoose";

const {Schema} = mongoose;
const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author: {
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    summary: String,
    badge: String,
    content:{
        type: String,
        required: true,
    },    
    cover: String,
},
 {timestamps: true}
 );

export default mongoose.model("Post", PostSchema);