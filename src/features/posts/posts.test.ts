import request from 'supertest'
import { app, ROUTER_PATH } from '../../app'

import { HTTP_STATUSES } from '../../http/statuses'

import { PostInputModel } from './models/input_model'
import { postTestManager } from './post_test_manager'

import { blogsRepository } from '../../repositories/blogs_repositoriy'



//создает блок который группирует несколько связанных тестов
describe('test for /posts', () => {
    
     //запускает функцию перед каждым тестом в этом файле
    beforeAll( async () => {
        await request(app).delete(ROUTER_PATH.test)
    })



    it('should return 200 and empty array', async () => {
        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [])
            
    })



    it('should return 404 for not existing entity', async () => {
        await request(app)
            .get(`${ROUTER_PATH.posts}/650050e9e9e9659e4c3057cd`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })


    it('should not create entity with incorrect input data', async () => {

        const data: PostInputModel = { 
                title: '',
                shortDescription: 'create shortDescription',
                content: 'create content',
                blogId: ''
            
        }

        await postTestManager.createPost(data, HTTP_STATUSES.BAD_REQUEST_400)

            
        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [])    
    })


    
    let createPost1: any = null
    let createPost2: any = null

    
    let blog1: any = null
    let blog2: any = null

    it('should create entity1 with correct input data', async () => {

        blog1 = await blogsRepository.createBlog('create name 1111111', 'create description 111111', 'create websiteUrl 111111')


        const data: PostInputModel = { 
            title: 'create title 1111',
            shortDescription: 'create shortDescription 1111',
            content: 'create content 1111',
            blogId: blog1.id
        }

        const result = await postTestManager.createPost(data, HTTP_STATUSES.CREATED_201)

        createPost1 = result.createEntity


        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [createPost1])

    })


    it('should create entity2 with correct input data', async () => {

        blog2 = await blogsRepository.createBlog('create name 2222', 'create description 222222', 'create websiteUrl 22222')

        
        const data: PostInputModel = { 
            title: 'create title 2222',
            shortDescription: 'create shortDescription 2222',
            content: 'create content 2222',
            blogId: blog2.id
        }

        const result = await postTestManager.createPost(data, HTTP_STATUSES.CREATED_201)

        createPost2 = result.createEntity

            
        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [createPost1, createPost2])   
            
    })

  
    it('should not update entity with incorrect input data', async () => {
        await request(app)
            .put(`${ROUTER_PATH.posts}/${createPost1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(
                { 
                    title: '',
                    shortDescription: 'update shortDescription 1',
                    content: 'update content 1',
                    blogId: blog1.id
                }
            )
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
         

            await request(app)
                .get(`${ROUTER_PATH.posts}/${createPost1.id}`)
                .expect(HTTP_STATUSES.OK_200, createPost1)

    })


    it('should not update entity that not exist', async () => {
        await request(app)
            .put(`${ROUTER_PATH.posts}/650050e9e9e9659e4c3057cd`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(
                { 
                    title: 'update title 1',
                    shortDescription: 'update shortDescription 1',
                    content: 'update content 1',
                    blogId: blog1.id
                }
            )
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

   

    it('should  update entity with correct input data', async () => {

        const data: PostInputModel = { 
            title: 'update title 1',
            shortDescription: 'update shortDescription 1',
            content: 'update content 1',
            blogId: blog1.id
        }


        await request(app)
            .put(`${ROUTER_PATH.posts}/${createPost1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.NO_CONTENT_204)



        await request(app)
            .get(`${ROUTER_PATH.posts}/${createPost1.id}`)
            .expect(HTTP_STATUSES.OK_200,
                                {   ...createPost1,
                                    title: data.title,
                                    shortDescription: data.shortDescription,
                                    content: data.content,
                                    blogId: blog1.id                
                                }
        )

        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [
                {   ...createPost1,
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: blog1.id   
                }, 
                createPost2])

      
        
        
        await request(app)
            .get(`${ROUTER_PATH.posts}/${createPost2.id}`)
            .expect(HTTP_STATUSES.OK_200, createPost2)

    })
    
    
    
    it('should delete both entityes', async () => {
        await request(app)
            .delete(`${ROUTER_PATH.posts}/${createPost1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)


        await request(app)
            .get(`${ROUTER_PATH.posts}/${createPost1.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)   
            
            
        await request(app)
            .delete(`${ROUTER_PATH.posts}/${createPost2.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)    


        await request(app)
            .get(`${ROUTER_PATH.posts}/${createPost2.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404) 

           
        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [])     
    })



})