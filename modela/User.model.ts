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
        required:[true,"Please Enter the Right Password"],
        minlength:6
    }
})