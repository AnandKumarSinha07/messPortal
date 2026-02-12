const mongoose=require('mongoose');

const complaintSchema=new mongoose.Schema({
    About:{
        type:String,
        trim:true,
        required:true,
        maxLength:50
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxLength:200
    },
    image:{
        type:String,
        trim:true,
    }
},{timestamps:true})
const complaint=mongoose.model("Complaint",complaintSchema);
module.exports=complaint;