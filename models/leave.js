const mongoose=require('mongoose');

const LeaveSchema=new mongoose.Schema({
    startDate:{
        type:Date,
        required:true,
        trim:true
    },
    endDate:{
        type:Date,
        required:true,
        trim:true,
    },
    reason:{
        type:String,
        required:true,
        maxLength:100,    
    },
     student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"    
    },
    status:{
        type:String,
        enum:["pending","rejected","accepted"],
        default:"pending"
    },
     appliedDate:{
        type:Date,
        default:Date.now
    },
    
})
const Leave=mongoose.model("Leave",LeaveSchema);
module.exports=Leave;