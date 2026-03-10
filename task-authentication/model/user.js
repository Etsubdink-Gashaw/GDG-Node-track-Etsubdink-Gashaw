import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    full_name:{
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
  
  });
//   userSchema.pre("save", async function(next) {
//     if(!this.isModified("password")) return next();
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
  
  export default mongoose.model("User", userSchema)
