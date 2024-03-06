import request from 'supertest'

import { app, ROUTER_PATH } from '../../../app'
import { HTTP_STATUSES, HttpStatusType } from '../../../http/statuses'

import { UserInputType } from '../types/userInputType'


export const userTestManager = {

    async createUser(data: UserInputType, expectedStatusCode: HttpStatusType = HTTP_STATUSES.CREATED_201){
        
        const response = await request(app)
                                    .post(ROUTER_PATH.users)
                                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                                    .send(data)
                                    .expect(expectedStatusCode)
                                   
        let createdEntity;
        
        if(expectedStatusCode === HTTP_STATUSES.CREATED_201){
                            
            createdEntity = response.body
                            
            expect(createdEntity).toEqual({
                id: expect.any(String),
                login: '111111',
                createdAt:  expect.any(String),
                email: '1111@mail.ru'                      
            })
        }
        return {response, createdEntity}                                    
    }
}