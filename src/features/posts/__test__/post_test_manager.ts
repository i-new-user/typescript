import request from 'supertest'
import { app, ROUTER_PATH } from "../../../app"
import { HTTP_STATUSES, HttpStatusType } from "../../../http/statuses"
import { PostInputModel } from '../models/entity/postInputModel'





export const postTestManager =  {

    async createPost(data: PostInputModel, expectedStatusCode: HttpStatusType = HTTP_STATUSES.CREATED_201) {
        const response = await request(app)
            .post(ROUTER_PATH.posts)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(expectedStatusCode)
         

        let createEntity;

        if(expectedStatusCode === HTTP_STATUSES.CREATED_201){

            createEntity = response.body 


            expect(createEntity).toEqual(
                {
                    id: expect.any(String),
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId,
                    blogName: expect.any(String),
                    createdAt: expect.any(String)
                }
            )

        }  


        return { response, createEntity }    
    }

}