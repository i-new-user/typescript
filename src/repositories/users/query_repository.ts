import { usersCollection } from "../../db"


import { WithId, ObjectId } from "mongodb"


import { PaginatorUserType } from "../../features/users/types/paginatorUserType"
import { UserMongoDBType } from "../../features/users/types/userMongoDBType"
import { UserOutputType } from "../../features/users/types/userOutputType"
import { UserViewType } from "../../features/users/types/userViewType"


export const usersQueryRepository = {

    async findUsers(sortBy: string, sortDirection: 1 | -1, pageNumber: string, pageSize: string, searchLoginTerm: string | null, searchEmailTerm: string | null){
        
        const filter = {$or: [
            {login: {$regex: searchLoginTerm ?? '', $options: 'i' }},
            {email: {$regex: searchEmailTerm ?? '', $options: 'i' }}
            ] }

        const totalDocuments = await usersCollection.countDocuments(filter)
        
        const users: WithId<UserMongoDBType>[] | [] = await usersCollection.find( filter )
                                                                            .sort({[sortBy]: sortDirection})
                                                                            .skip((+pageNumber-1) * +pageSize)
                                                                            .limit(+pageSize)
                                                                            .toArray()

        return this._mapUserOutputModel(users, totalDocuments, +pageNumber, +pageSize)

    },

    _mapUserOutputModel(users: WithId<UserMongoDBType>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorUserType {
        return{
            pagesCount: Math.ceil(totalDocuments/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalDocuments,
            items:  users.map( user => ({
                id: String(user._id),
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            })) 
        }
    },

    async findUserById(id: string): Promise<UserOutputType | null>{

        const user: WithId<UserMongoDBType> | null = await usersCollection.findOne( {_id: new ObjectId(id)} )

        if(user){
            return {
                id: String(user._id),
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            }
        } else {
            return null
        }
    }

}












