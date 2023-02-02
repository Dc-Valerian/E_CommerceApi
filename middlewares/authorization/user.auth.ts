import jwt,{JwtPayload,Secret} from "jsonwebtoken"


 interface Payload extends JwtPayload{
            _id:string,
            email:string
        }

 const secret ="byvktuctxydufuvuy,dxkkyrysasdkrfghu.iyjraehsdrtfygiuhoijpoi,mncxbdgfcnghvhjbkjnnbwestrdyuioouytrstdtyfgiuoihopj.bzxfc";

export const generateToken = (user:Payload)=>{
    return jwt.sign(user,secret as Secret,{expiresIn:"1h"})
}