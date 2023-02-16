import { Document, model, Schema } from "mongoose";
import { IUser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";
import { authRole } from "../constants/user.constant";

interface UserSchema extends Document, IUser {}

const userSchema: Schema<UserSchema> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please provide your confirm password"],
      minlength: 6,
    },
    role: {
      type: String,

      enum: [authRole.admin, authRole.manager, authRole.user],
      message: `Please identify your role as provided: 
      ${authRole.user}, 
      ${authRole.admin}, 
      ${authRole.manager}`,
      default: authRole.user,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const UserModel = model<UserSchema>("User", userSchema);
export default UserModel;

// METHOD IS A FUNTION IN AN OBJECT
const animal ={
  sound:"Meow",
  legs:4,
  act:function(){
    return `A cat has ${this.legs} legs, and sounds ${this.sound}`
  }
}
console.log(animal.act());
