import request from 'supertest'
import { app, ROUTER_PATH } from "../../app"
import { HTTP_STATUSES, HttpStatusType } from "../../http/statuses"
import { BlogInputModel } from './models/input_model'





export const blogTestManager =  {

    async createBlog(data: BlogInputModel, expectedStatusCode: HttpStatusType = HTTP_STATUSES.CREATED_201) {
        const response = await request(app)
            .post(ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect( expectedStatusCode )
         

        let createEntity;

        if(expectedStatusCode === HTTP_STATUSES.CREATED_201){

            createEntity = response.body 


            expect(createEntity).toEqual(
                {
                    id: expect.any(String),
                    name: data.name,
                    description: data.description,
                    websiteUrl: data.websiteUrl,
                    createdAt:  expect.any(String),
                    isMembership: expect.any(Boolean)
                }
            )

        }  


        return { response, createEntity}    
    }

}