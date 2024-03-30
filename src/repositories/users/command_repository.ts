import { ObjectId } from "mongodb"
import { usersCollection } from "../../db"


import { UserMongoDBType } from "../../features/users/types/userMongoDBType"


export const usersRepository = {

    async createUser(newUser: UserMongoDBType): Promise<UserMongoDBType>{
        const result = await usersCollection.insertOne(newUser)
        return newUser
    },

    async deleteUser(id: string): Promise<boolean>{

        console.log('repository')
        console.log(id)
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllUsers(){
        return await usersCollection.deleteMany({})
    },

    
}