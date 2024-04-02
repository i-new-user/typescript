import bcrypt from 'bcrypt'


import { usersCollection } from '../db'
import { usersRepository } from '../repositories/users/command_repository'
import { usersQueryRepository } from '../repositories/users/query_repository'


import { UserMongoDBType } from '../features/users/types/userMongoDBType'
import { UserViewType } from '../features/users/types/userViewType'

import { authService } from './auth_service'


export const userService = {

    async createUser(login: string, password: string, email: string): Promise<UserViewType>{

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await authService.generateHash(password, passwordSalt)

        const newUser: UserMongoDBType = {
            login: login,
            email: email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        const result = await usersCollection.insertOne(newUser)

        return {
            id: String(result.insertedId),
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    },


    async deleteUser(id: string): Promise<boolean>{
        return await usersRepository.deleteUser(id)
    },


    async deleteAllUsers(){
        return await usersRepository.deleteAllUsers()
    },



}