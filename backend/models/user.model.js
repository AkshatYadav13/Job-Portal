import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "recruiter"],
    required: true,
  },
  profile:{
    bio:{
      type:String,
      default:''
    },
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Company'
    },
    profilePhoto:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
    }
  },
},({timestamps:true}));

export const User = mongoose.model('User',userSchema)