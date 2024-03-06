import  request  from "supertest";

import { app, ROUTER_PATH } from "../../../app";
import { HTTP_STATUSES, HttpStatusType } from "../../../http/statuses";

import { BlogInputType } from "../types/blogInputType";

export const blogTestManager = {

    async createBlog(data: BlogInputType, expectedStatusCode: HttpStatusType = HTTP_STATUSES.CREATED_201){

        const response = await request(app)
                                    .post(ROUTER_PATH.blogs)
                                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                                    .send(data)
                                    .expect(expectedStatusCode)

        let createdEntity;
        
        if(expectedStatusCode === HTTP_STATUSES.CREATED_201){

        createdEntity = response.body

        expect(createdEntity).toEqual({
            id: expect.any(String),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt:  expect.any(String),
            isMembership: expect.any(Boolean)
        })
        }

        

        return {response, createdEntity}                        
    },


}