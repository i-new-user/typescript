import request from 'supertest'

import { app, ROUTER_PATH } from '../../../app'
import { HTTP_STATUSES, HttpStatusType } from '../../../http/statuses'

import { PostInputType } from '../types/postInputType'


export const postTestManager = {

    async createPost(data: PostInputType, expectedStatusCode: HttpStatusType = HTTP_STATUSES.CREATED_201){

        const response = await request(app)
                                    .post(ROUTER_PATH.posts)
                                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                                    .send(data)
                                    .expect(expectedStatusCode)

        let createdEntity;

        if(expectedStatusCode === HTTP_STATUSES.CREATED_201){

            createdEntity = response.body
    
            expect(createdEntity).toEqual({
                id: expect.any(String),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: expect.any(String),
                createdAt: expect.any(String)
            })
        }

        return {response, createdEntity}
    }
}