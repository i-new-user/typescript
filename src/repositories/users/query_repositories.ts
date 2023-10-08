import { usersCollection } from './../../db';

import { PaginatorUserModel } from '../../features/users/models/entity/userPaginator';
import { UserMongoDBModel } from '../../features/users/models/entity/userMongoDBModel';

import { WithId } from 'mongodb';






export const usersQueryRepository = {

    async findUsers(sortBy: string, sortDirection: 1 | -1, pageNumber: string, pageSize: string, 
                    searchLoginTerm: string | null, searchEmailTerm: string | null): Promise<PaginatorUserModel> {

        const filter = {$or: [
                            {login: {$regex: searchLoginTerm ?? '', $options: 'i' }},
                            {email: {$regex: searchEmailTerm ?? '', $options: 'i' }}
                            ] } 

        const totalDocuments = await usersCollection.countDocuments( filter )


        const users: WithId<UserMongoDBModel>[] | [] = await usersCollection.find( filter )
                                                                            .sort({[sortBy]: sortDirection})
                                                                            .skip((+pageNumber-1) * +pageSize)
                                                                            .limit(+pageSize)
                                                                            .toArray()

        return this._mapUserOutputModel(users, totalDocuments, +pageNumber, +pageSize)

    },

    _mapUserOutputModel(users: WithId<UserMongoDBModel>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorUserModel {
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

}