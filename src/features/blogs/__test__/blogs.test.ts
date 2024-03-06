import  request  from "supertest";

import { app, ROUTER_PATH } from "../../../app";
import { HTTP_STATUSES } from "../../../http/statuses";

import { blogsCollection } from "../../../db";

import { BlogInputType } from "../types/blogInputType";

import { blogTestManager } from "./blogTestManager";


//создает блок который группирует несколько связанных тестов
describe('test for /blogs', () => {
    

     //запускает функцию перед каждым тестом в этом файле
    beforeAll( async () => {
       const p =  await request(app).delete(ROUTER_PATH.test)
    })

    it('should return 200 and empty array', async () => {

        const totalDocuments = await blogsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
            .get(ROUTER_PATH.blogs)
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
            .get(`${ROUTER_PATH.blogs}/65ce7e952060d0e34ae00000`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should not create entity with incorrect input data', async () => {

        const totalDocuments = await blogsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1


        const data: BlogInputType = { 
            name: '',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        
        await blogTestManager.createBlog(data, HTTP_STATUSES.BAD_REQUEST_400)


        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, {
                                        "pagesCount": pagesCount,
                                        "page": pageNumber,
                                        "pageSize": pageSize,
                                        "totalCount": totalDocuments,
                                        "items": []
                                    })
    })


    let createdBlog1: any = null
    let createdBlog2: any = null

    it('should create entety with correct input data', async () => {

        const data: BlogInputType = {
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        const {createdEntity}  = await blogTestManager.createBlog(data)

        createdBlog1 = createdEntity

        const totalDocuments = await blogsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, {
                                    "pagesCount": pagesCount,
                                    "page": pageNumber,
                                    "pageSize": pageSize,
                                    "totalCount": totalDocuments,
                                    "items": [createdBlog1]
                                })
    })

    it('should create entity2 with correct input data', async () => {

        const data: BlogInputType = { 
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        const {createdEntity}  = await blogTestManager.createBlog(data)

        createdBlog2 = createdEntity

        const totalDocuments = await blogsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
                .get(ROUTER_PATH.blogs)
                .expect(HTTP_STATUSES.OK_200, {
                    "pagesCount": pagesCount,
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalDocuments,
                    "items": [createdBlog1, createdBlog2]
                })


    })
    
    it('should not update entity with incorrect input data', async () => {

        const data: BlogInputType = { 
            name: 'update name',
            description: '',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }
        
        await request(app)
                    .put(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send( data )
                    .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
                    .get(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                    .expect(HTTP_STATUSES.OK_200, createdBlog1)
    })

    it('should not update entity that not exist', async () => {

        const data: BlogInputType = { 
            name: 'update name',
            description: 'update description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        await request(app)
                    .put(`${ROUTER_PATH.blogs}/650050e9e9e9659e4c3057cd`)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send( data )
                    .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
                    .get(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                    .expect(HTTP_STATUSES.OK_200, createdBlog1)
    })

    it('should update entity with correct input data', async () => {

        const data: BlogInputType = { 
            name: 'update name',
            description: 'update description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        await request(app)
                    .put(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send( data )
                    .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
                    .get(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                    .expect(HTTP_STATUSES.OK_200, {...createdBlog1,
                                                   name: data.name,
                                                   description: data.description,
                                                   websiteUrl: data.websiteUrl,
                                                })

        const totalDocuments = await blogsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1
        
        await request(app)
                    .get(`${ROUTER_PATH.blogs}`)
                    .expect(HTTP_STATUSES.OK_200, {"pagesCount": pagesCount,
                                                   "page": pageNumber,
                                                   "pageSize": pageSize,
                                                   "totalCount": totalDocuments,
                                                   "items": [{...createdBlog1,
                                                              name: data.name,
                                                              description: data.description,
                                                              websiteUrl: data.websiteUrl,
                                                             }, createdBlog2]
                                                            })
                        
    })

    it('should delete both entityes', async () => {

        await request(app)
                .delete(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
                .get(`${ROUTER_PATH.blogs}/${createdBlog1.id}`)
                .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
                .delete(`${ROUTER_PATH.blogs}/${createdBlog2.id}`)
                .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
                .get(`${ROUTER_PATH.blogs}/${createdBlog2.id}`)
                .expect(HTTP_STATUSES.NOT_FOUND_404)

        const totalDocuments = await blogsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
                .get(ROUTER_PATH.blogs)
                .expect(HTTP_STATUSES.OK_200, {"pagesCount": pagesCount,
                                               "page": pageNumber,
                                               "pageSize": pageSize,
                                               "totalCount": totalDocuments,
                                               "items": []})
    })



})


