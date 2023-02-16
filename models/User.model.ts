import { Document, model, Schema } from "mongoose";
import { ICartItems, IUser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";
import { authRole } from "../constants/user.constant";

interface UserSchema extends Document, IUser {
  clearCart():Promise<void>;
  removeFromCart(productId:string):Promise<void>
  addToCart(prodID:string,doDecrease:boolean):Promise<boolean>
}

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

// WHEN WRITING AN OBJECT IT'S NOT ADVISABLE TO USED ARROW FUNCTION...
userSchema.methods.addToCart = function(prodID:string,doDecrease:boolean){
  let cartItemIndex = -1;
  let updateCartItem: ICartItems[]=[]

if(this.cart.items){
  cartItemIndex = this.cart.items.findIndex((cp:{productId:{toString:()=>string}})=>{
    return cp.productId.toString() === prodID.toString()
  })
  updateCartItem =[...this.cart.items]
}
let newQuantity =1
if(cartItemIndex >= 0){
  if(doDecrease){
    newQuantity = this.cart.items[cartItemIndex].quantity -1 
    if(newQuantity >= 0){
      return this.removeFromCart(prodID)
    }else{
      newQuantity = this.cart.items[cartItemIndex].quantity + 1
    }
    updateCartItem[cartItemIndex].quantity = newQuantity
    
  }
}
}

userSchema.methods.removeFromCart = function(productId:string){
 const updateCart =   this.cart.items.filter((item:{productId:{toString:()=>string}})=>{
  return item.productId.toString() !== productId.toString()
     })
     this.cart.items = updateCart
     return this.save({validateBeforeSave:false})
}

userSchema.methods.clearCart =function(){
  this.cart ={items:[]}
  return this.save()
}

const UserModel = model<UserSchema>("User", userSchema);
export default UserModel;

// METHOD IS A FUNTION IN AN OBJECT
// const animal ={
//   sound:"Meow",
//   legs:4,
//   act:function(){
//     return `A cat has ${this.legs} legs, and sounds ${this.sound}`
//   }
// }
// console.log(animal.act());
