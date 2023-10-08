import { usersCollection } from "../../db"
import { UserMongoDBModel } from "../../features/users/models/entity/userMongoDBModel"
import { ObjectId } from "mongodb"

export const usersRepository = {

    async createUser(newUser: UserMongoDBModel, ): Promise<UserMongoDBModel>{
        const result = await usersCollection.insertOne(newUser)
        return newUser
    },

    async deleteUser(id: string): Promise<boolean>{
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async findByLoginOrEmail(loginOrEmail: string){
        const user = await usersCollection.findOne( { $or: [ {email: loginOrEmail}, {login:  loginOrEmail} ] } )
        return user
    }

    
}