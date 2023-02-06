import { Document,model,Schema } from "mongoose";
import { IUser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail"


interface UserSchema extends Document,IUser{}

const userSchema :Schema<UserSchema> = new Schema({
    name:{
        type:String,
        required:[true,"Please Enter in Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter a valid email"],
        trim:true,
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minlength:6
    },
    confirmPassword:{
          type:String,
        required:[true,"Please Enter the Confirm Password"],
        minlength:6
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user","manger"],
        message:`Please identify your role as provided:admin,user,manager`,
        default:"user",
    }
  
},{versionKey:false,timeStamps:true});

const UserModel = model<UserSchema>("User",userSchema)

export default UserModel;
