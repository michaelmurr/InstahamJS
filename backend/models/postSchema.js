import mongoose, { Model, Schema } from "mongoose";

const postSchema = mongoose.Schema({
    ownerID:{
        type: String,
        required: true,
    },
    filename:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0,
    },
    uploadDate:{
        default: Date.now(),
    }
});

export default mongoose.model("Posts", postSchema)