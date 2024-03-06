import { commentsRepository } from "../repositories/comments/command_repository"


export const commentsService = {

    async updateComment(id: string, content: string): Promise<boolean>{
        return await commentsRepository.updateComment(id, content)
    },

    async deleteComment(id: string): Promise<boolean>{
        return await commentsRepository.deleteComment(id)
    },

    async deleteAllComments(){
        return await commentsRepository.deleteAllComments()
    }
}