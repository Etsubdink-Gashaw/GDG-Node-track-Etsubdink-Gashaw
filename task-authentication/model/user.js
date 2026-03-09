import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        requied: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
    },
    email:{
        type:String,
        requied: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match:[/\S+@\S+\.\S+/, "Please provide a valid email address"]

    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"]
    },
  
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user"
    // },
  
    // refreshToken: String,
  
    // isVerified: {
    //   type: Boolean,
    //   default: false
    // },
  
   // passwordChangedAt: Date
  })
  export default mongoose.model("User", userSchema)
