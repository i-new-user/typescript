import { usersCollection } from "../../db"

export const authQueryRepository = {
    async findByLoginOrEmail(loginOrEmail: string){
        const user = await usersCollection.findOne({ $or: [ {login: loginOrEmail}, {email: loginOrEmail} ] })
        return user
    }
}