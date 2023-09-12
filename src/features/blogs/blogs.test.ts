import request from 'supertest'
import { app, ROUTER_PATH } from '../../app'
import { HTTP_STATUSES } from '../../http/statuses'

import { BlogInputModel } from './models/input_model'

import { blogTestManager } from './blog_test_manager'



//создает блок который группирует несколько связанных тестов
describe('test for /blogs', () => {
    
    //запускает функцию перед каждым тестом в этом файле
    beforeAll( async () => {
        await request(app).delete(ROUTER_PATH.test)
    })



    it('should return 200 and empty array', async () => {
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [])
    })


    it('should return 404 for not existing entity', async () => {
        await request(app)
            .get(`${ROUTER_PATH.blogs}/650050e9e9e9659e4c3057cd`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })


    it('should not create entity with incorrect input data', async () => {

        const data: BlogInputModel = { 
            name: '',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        await blogTestManager.createBlog(data, HTTP_STATUSES.BAD_REQUEST_400)
            
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [])    
    })


    
    let createBlog1: any = null
    let createBlog2: any = null

    it('should create entity1 with correct input data', async () => {

        const data: BlogInputModel = { 
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/',
        }

        const { createEntity } = await blogTestManager.createBlog(data)

        createBlog1 = createEntity
        

        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [createBlog1])

    })


    it('should create entity2 with correct input data', async () => {


        const data: BlogInputModel = { 
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }


        const { createEntity } = await blogTestManager.createBlog(data)

        createBlog2 = createEntity

            
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [createBlog1, createBlog2])   
            
    })

  
    it('should not update entity with incorrect input data', async () => {

        const data: BlogInputModel = { 
            name: 'name',
            description: '',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }  


        await request(app)
            .put(`${ROUTER_PATH.blogs}/${createBlog1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
         

        await request(app)
            .get(`${ROUTER_PATH.blogs}/${createBlog1.id}`)
            .expect(HTTP_STATUSES.OK_200, createBlog1)

    })


    it('should not update entity that not exist', async () => {

        await request(app)
            .put(`${ROUTER_PATH.blogs}/650050e9e9e9659e4c3057cd`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(
                { 
                  name: 'name',
                  description: 'description',
                  websiteUrl: 'https://samurai.it-incubator.io/'
                }
            )
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

   

    it('should  update entity with correct input data', async () => {

        const data: BlogInputModel = { 
            name: 'update name',
            description: 'update description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }


        await request(app)
            .put(`${ROUTER_PATH.blogs}/${createBlog1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.NO_CONTENT_204)



        await request(app)
            .get(`${ROUTER_PATH.blogs}/${createBlog1.id}`)
            .expect(HTTP_STATUSES.OK_200,
                                {   ...createBlog1,
                                    name: data.name,
                                    description: data.description,
                                    websiteUrl: data.websiteUrl
                                }
        )

        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [
                {   ...createBlog1,
                    name: data.name,
                    description: data.description,
                    websiteUrl: data.websiteUrl
                }, 
                createBlog2])

      
        
        
        await request(app)
            .get(`${ROUTER_PATH.blogs}/${createBlog2.id}`)
            .expect(HTTP_STATUSES.OK_200, createBlog2)

    })
    
    
    
    it('should delete both entityes', async () => {
        await request(app)
            .delete(`${ROUTER_PATH.blogs}/${createBlog1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)


        await request(app)
            .get(`${ROUTER_PATH.blogs}/${createBlog1.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)   
            
            
        await request(app)
            .delete(`${ROUTER_PATH.blogs}/${createBlog2.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)    


        await request(app)
            .get(`${ROUTER_PATH.blogs}/${createBlog2.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404) 

           
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [])     
    })


})