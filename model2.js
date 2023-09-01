import mongoose from "mongoose";

const userTaskSchema = new mongoose.Schema({
    specialName:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
    },
    column:{
        type:String,
    }

},{timestamps:true})

export default mongoose.model("user-tasks",userTaskSchema);