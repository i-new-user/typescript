import { ObjectId } from "mongodb"

export type BlogMongoDBModel = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}