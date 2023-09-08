import request from 'supertest'
import { app, ROUTER_PATH } from '../../app'
import { HTTP_STATUSES } from '../../http/statuses'
import { PostInputModel } from './models/input_model'
import { postTestManager } from './post_test_manager'



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
            .get(`${ROUTER_PATH.posts}/1`)
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

    it('should create entity1 with correct input data', async () => {

        const data: PostInputModel = { 
            title: 'create title 1111',
            shortDescription: 'create shortDescription 1111',
            content: 'create content 1111',
            blogId: ''
        }

        const result = await postTestManager.createPost(data, HTTP_STATUSES.CREATED_201)

        createPost1 = result.createEntity


        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [createPost1])

    })


    it('should create entity2 with correct input data', async () => {

        const data: PostInputModel = { 
            title: 'create title 2222',
            shortDescription: 'create shortDescription 2222',
            content: 'create content 2222',
            blogId: ''
        }

        const result = await postTestManager.createPost(data, HTTP_STATUSES.CREATED_201)

        createPost2 = result.createEntity

            
        await request(app)
            .get(ROUTER_PATH.posts)
            .expect(HTTP_STATUSES.OK_200, [createPost1, createPost2])   
            
    })

  
    // it('should not update entity with incorrect input data', async () => {
    //     await request(app)
    //         .put(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
    //         .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
    //         .send(
    //             { 
    //               name: 'name',
    //               description: '',
    //               websiteUrl: 'https://samurai.it-incubator.io/'
    //             }
    //         )
    //         .expect(HTTP_STATUSES.BAD_REQUEST_400)
         

    //         await request(app)
    //             .get(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
    //             .expect(HTTP_STATUSES.OK_200, newEntity1)

    // })


    // it('should not update entity that not exist', async () => {
    //     await request(app)
    //         .put(`${ROUTER_PATH.blogs}/17`)
    //         .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
    //         .send(
    //             { 
    //               name: 'name',
    //               description: 'description',
    //               websiteUrl: 'https://samurai.it-incubator.io/'
    //             }
    //         )
    //         .expect(HTTP_STATUSES.NOT_FOUND_404)
    // })

   

    // it('should  update entity with correct input data', async () => {
    //     await request(app)
    //         .put(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
    //         .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
    //         .send(
    //             { 
    //               name: 'update name',
    //               description: 'update description',
    //               websiteUrl: 'https://samurai.it-incubator.io/'
    //             }
    //         )
    //         .expect(HTTP_STATUSES.NO_CONTENT_204)



    //     await request(app)
    //         .get(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
    //         .expect(HTTP_STATUSES.OK_200,
    //                             {   ...newEntity1,
    //                                 name: 'update name',
    //                                 description: 'update description',
    //                                 websiteUrl: 'https://samurai.it-incubator.io/'
    //                             }
    //     )

    //     await request(app)
    //         .get(ROUTER_PATH.blogs)
    //         .expect(HTTP_STATUSES.OK_200, [
    //             {   ...newEntity1,
    //                 name: 'update name',
    //                 description: 'update description',
    //                 websiteUrl: 'https://samurai.it-incubator.io/'
    //             }, 
    //             newEntity2])

      
        
        
    //     await request(app)
    //         .get(`${ROUTER_PATH.blogs}/${newEntity2.id}`)
    //         .expect(HTTP_STATUSES.OK_200, newEntity2)

    // })
    
    
    
    // it('should delete both entityes', async () => {
    //     await request(app)
    //         .delete(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
    //         .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
    //         .expect(HTTP_STATUSES.NO_CONTENT_204)


    //     await request(app)
    //         .get(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
    //         .expect(HTTP_STATUSES.NOT_FOUND_404)   
            
            
    //     await request(app)
    //         .delete(`${ROUTER_PATH.blogs}/${newEntity2.id}`)
    //         .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
    //         .expect(HTTP_STATUSES.NO_CONTENT_204)    


    //     await request(app)
    //         .get(`${ROUTER_PATH.blogs}/${newEntity2.id}`)
    //         .expect(HTTP_STATUSES.NOT_FOUND_404) 

           
    //     await request(app)
    //         .get(ROUTER_PATH.blogs)
    //         .expect(HTTP_STATUSES.OK_200, [])     
    // })



})