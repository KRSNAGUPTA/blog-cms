import mongoose, { Schema } from "mongoose";

const editorReqSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  username:{
    type:String,
    required: true,
    unique:true
  }
}, { timestamps: true }); 

export default mongoose.model("EditorReq", editorReqSchema);
