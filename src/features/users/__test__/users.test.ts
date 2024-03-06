import request  from "supertest";

import { app, ROUTER_PATH } from "../../../app";
import { HTTP_STATUSES } from "../../../http/statuses";

import { usersCollection } from "../../../db";

import { UserInputType } from "../types/userInputType";
import { userTestManager } from "./userTestManager";



describe('test for /users', () => {

    beforeAll( async () => {
        await request(app).delete(ROUTER_PATH.test)
    })

    it('should return 200 and empty array', async () => {

        const totalDocuments = await usersCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
            .get(ROUTER_PATH.users)
            .expect(HTTP_STATUSES.OK_200, {
                                           "pagesCount": pagesCount,
                                           "page": pageNumber,
                                           "pageSize": pageSize,
                                           "totalCount": totalDocuments,
                                           "items": []
                                        })
    })

    it('should return 404 for not existing entity', async () => {
        await request(app)
            .get(`${ROUTER_PATH.users}/65ce7e952060d0e34ae00000`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should not create entity with incorrect input data', async () => {

        const totalDocuments = await usersCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1


        const data: UserInputType = { 
            login: '111111111111111',
            password: 'password',
            email: '1111@mail.ru'
        }

        
        await request(app)
                    .post(ROUTER_PATH.users)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send(data)
                    .expect(HTTP_STATUSES.BAD_REQUEST_400)
       


        await request(app)
            .get(ROUTER_PATH.users)
            .expect(HTTP_STATUSES.OK_200, {
                                        "pagesCount": pagesCount,
                                        "page": pageNumber,
                                        "pageSize": pageSize,
                                        "totalCount": totalDocuments,
                                        "items": []
                                    })
    })

    let createdUser1: any = null
    let createdUser2: any = null

    it('should create entety with correct input data', async () => {

        const data: UserInputType = { 
            login: '111111',
            password: 'password',
            email: '1111@mail.ru'
        }

        
        const createdEntity =  await userTestManager.createUser(data)
    
        createdUser1 = createdEntity.createdEntity

        const totalDocuments = await usersCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1
     

        await request(app)
            .get(ROUTER_PATH.users)
            .expect(HTTP_STATUSES.OK_200, {
                                    "pagesCount": pagesCount,
                                    "page": pageNumber,
                                    "pageSize": pageSize,
                                    "totalCount": totalDocuments,
                                    "items": [createdUser1]
                                })
    })

})