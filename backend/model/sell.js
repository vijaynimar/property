import mongoose from "mongoose";
const selling=new mongoose.Schema({
    username: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: "user"
    },
    properties:[String]
})