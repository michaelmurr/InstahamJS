import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    ownerID:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0,
    },
    uploadDate:{
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Post", postSchema)