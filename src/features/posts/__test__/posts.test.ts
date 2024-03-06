import  request  from "supertest";

import { app, ROUTER_PATH } from "../../../app";
import { HTTP_STATUSES } from "../../../http/statuses";

import { postsCollection } from "../../../db";

import { PostInputType } from "../types/postInputType";

import { blogService } from "../../../domains/blogs_service";

import { postTestManager } from "./postTestManager";
import { postService } from "../../../domains/posts_service";




//создает пост который группирует несколько связанных тестов
describe('test for /posts', () => {
    

     //запускает функцию перед каждым тестом в этом файле
    beforeAll( async () => {
        await request(app).delete(ROUTER_PATH.test)
    })

    
    it('should return 200 and empty array', async () => {

        const totalDocuments = await postsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
            .get(ROUTER_PATH.posts)
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
            .get(`${ROUTER_PATH.posts}/65ce7e952060d0e34ae00000`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should not create entity with incorrect input data', async () => {

        const totalDocuments = await postsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1


        const data: PostInputType = { 
            title: '',
            shortDescription: 'update shortDescription 1',
            content: 'update content 1',
            blogId: ''
        }

        
        await postTestManager.createPost(data, HTTP_STATUSES.BAD_REQUEST_400)


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

    let createdPost1: any = null
    let createdPost2: any = null

    let blog1: any = null
    let blog2: any = null

    it('should create entety with correct input data', async () => {


        blog1 = await blogService.createBlog('create name 111111', 'create description 111111', 'create websiteUrl 1111111')

        const data: PostInputType = {
            title: 'create title 1',
            shortDescription: 'create shortDescription 1',
            content: 'create content 1',
            blogId: blog1.id
        }

        const result = await postTestManager.createPost(data, HTTP_STATUSES.CREATED_201)
        
        const totalDocuments = await postsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1
        createdPost1 = result.createdEntity

        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, {
                                    "pagesCount": pagesCount,
                                    "page": pageNumber,
                                    "pageSize": pageSize,
                                    "totalCount": totalDocuments,
                                    "items": [createdPost1]
                                })
    })

    it('should create entity2 with correct input data', async () => {

        blog2 = await blogService.createBlog('create name 2222', 'create description 222222', 'create websiteUrl 22222')

        const data: PostInputType = {
            title: 'create title 2',
            shortDescription: 'create shortDescription 2',
            content: 'create content 2',
            blogId: blog2.id
        }

        const result = await postTestManager.createPost(data, HTTP_STATUSES.CREATED_201)

        createdPost2 = result.createdEntity

        const totalDocuments = await postsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
                .get(ROUTER_PATH.posts)
                .expect(HTTP_STATUSES.OK_200, {
                    "pagesCount": pagesCount,
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalDocuments,
                    "items": [createdPost1, createdPost2]
                })


    })
    
    it('should not update entity with incorrect input data', async () => {

        const data: PostInputType = { 
            title: '',
            shortDescription: 'update shortDescription',
            content: 'update content',
            blogId: blog1.id
        }
        
        await request(app)
                    .put(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send( data )
                    .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
                    .get(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                    .expect(HTTP_STATUSES.OK_200, createdPost1)
    })

    it('should not update entity that not exist', async () => {

        const data: PostInputType = { 
            title: 'update title',
            shortDescription: 'update shortDescription',
            content: 'update content',
            blogId: blog1.id
        }

        await request(app)
                    .put(`${ROUTER_PATH.posts}/650050e9e9e9659e4c3057cd`)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send( data )
                    .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
                    .get(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                    .expect(HTTP_STATUSES.OK_200, createdPost1)
    })

    it('should update entity with correct input data', async () => {

        const data: PostInputType = { 
            title: 'update title',
            shortDescription: 'update shortDescription',
            content: 'update content',
            blogId: blog1.id
        }

        const totalDocuments = await postsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
                    .put(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                    .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                    .send( data )
                    .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
                    .get(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                    .expect(HTTP_STATUSES.OK_200, {...createdPost1,
                        title: data.title,
                        shortDescription: data.shortDescription,
                        content: data.content,
                        blogId: blog1.id
                                                })
        
        await request(app)
                    .get(`${ROUTER_PATH.posts}`)
                    .expect(HTTP_STATUSES.OK_200, {"pagesCount": pagesCount,
                                                   "page": pageNumber,
                                                   "pageSize": pageSize,
                                                   "totalCount": totalDocuments,
                                                   "items": [{...createdPost1,
                                                               title: data.title,
                                                               shortDescription: data.shortDescription,
                                                               content: data.content,
                                                               blogId: blog1.id}, 
                                                               createdPost2]
                                                            })
                        
    })

    it('should delete both entityes', async () => {

        await request(app)
                .delete(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
                .get(`${ROUTER_PATH.posts}/${createdPost1.id}`)
                .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
                .delete(`${ROUTER_PATH.posts}/${createdPost2.id}`)
                .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
                .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
                .get(`${ROUTER_PATH.posts}/${createdPost2.id}`)
                .expect(HTTP_STATUSES.NOT_FOUND_404)

        const totalDocuments = await postsCollection.countDocuments()
        const pageSize = 10
        const pagesCount = Math.ceil(totalDocuments/pageSize)
        const pageNumber = 1

        await request(app)
                .get(ROUTER_PATH.posts)
                .expect(HTTP_STATUSES.OK_200, {"pagesCount": pagesCount,
                                               "page": pageNumber,
                                               "pageSize": pageSize,
                                               "totalCount": totalDocuments,
                                               "items": []})
    })


   

})

