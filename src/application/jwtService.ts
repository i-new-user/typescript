import { UserMongoDBType } from "../features/users/types/userMongoDBType";
import { ObjectId, WithId } from "mongodb";
import jwt  from "jsonwebtoken";

import { settings } from "../settings";


export const jwtService = {
    
    async createJWT(user: WithId<UserMongoDBType>){
        const token = jwt.sign( {userId: user._id}, settings.JWT_SECRET, {expiresIn: '120h'})
        return {accessToken: token}
        
    },

    async getUserIdByToken(token: string){
        try{

            const result: any = jwt.verify(token, settings.JWT_SECRET)
            console.log(result)
            return result.userId
        } catch(e){
            return null
        }
    }
}