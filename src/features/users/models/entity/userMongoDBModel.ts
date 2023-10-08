export type UserMongoDBModel = {
    login: string
    email: string
    passwordHash: string
    passwordSalt: string
    createdAt: string
}