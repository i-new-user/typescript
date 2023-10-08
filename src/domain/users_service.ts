import { usersCollection } from "../db";
import { usersRepository } from "../repositories/users/command_repositories";

import { UserViewModel } from "../features/users/models/entity/userViewModel";
import { UserMongoDBModel } from "../features/users/models/entity/userMongoDBModel";

import bcrypt from 'bcrypt'


export const usersService = {

    async createUser(login: string, email: string, password: string): Promise<UserViewModel> {


        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash( password, passwordSalt)

        const newUser: UserMongoDBModel = {
            login: login,
            email: email,
            createdAt: new Date().toISOString()
        }

        const result = await usersCollection.insertOne(newUser)

        return {
            id: String(result.insertedId),
            login: newUser.login,
            email: newUser.email,
            passwordHash,
            passwordSalt,
            createdAt: newUser.createdAt
        }

    },

    async checkCredentials(loginOrMail: string, password: string){
        const user = await usersRepository.findByLoginOrEmail(loginOrMail)
        if(!user) return false

        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if(user.passwordHash !== passwordHash){
            return false
        }
        return true
    },

    async _generateHash(password: string, salt: string){
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async deleteUser(id: string): Promise<boolean>{
        return await usersRepository.deleteUser(id)
    }


}