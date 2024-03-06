import bcrypt from 'bcrypt'
import { WithId } from 'mongodb'
import { UserMongoDBType } from '../features/users/types/userMongoDBType'
import { authQueryRepository } from '../repositories/auth/query_repository'


export const authService = {

    async generateHash(password: string, salt: string){
        const hash = await bcrypt.hash(password, salt)
        return hash
    },


    async checkCredentials(loginOrEmail: string, password: string): Promise<WithId<UserMongoDBType> | null> {
        const user = await authQueryRepository.findByLoginOrEmail(loginOrEmail)
        if(!user) return null

        const passwordHash = await this.generateHash(password, user.passwordSalt)
        if(user.passwordHash !== passwordHash){
            return null
        }
        return user
    },
}