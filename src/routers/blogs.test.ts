import request from 'supertest'
import { app } from '..'
import { HTTP_STATUSES } from '../http/statuses'
import { ROUTER_PATH } from '..'

import { BlogInputModel } from '../models/blogs/input_model'



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
            .get(`${ROUTER_PATH.blogs}/1`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })


    it('should not create entity with incorrect input data', async () => {
        await request(app)
            .post(ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(
                { 
                  name: '',
                  description: 'description',
                  websiteUrl: 'https://samurai.it-incubator.io/'
                }
            )
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
         
        
            
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [])    
    })


    
    let newEntity1: any = null
    let newEntity2: any = null

    it('should create entity1 with correct input data', async () => {

        const data: BlogInputModel = { 
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }

        const respons = await request(app)
            .post(ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.CREATED_201)
         
        
            
        newEntity1 = respons.body 


        expect(newEntity1).toEqual(
            {
                id: expect.any(String),
                name: newEntity1.name,
                description: newEntity1.description,
                websiteUrl: newEntity1.websiteUrl
            }
        )


        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [newEntity1])

    })


    it('should create entity2 with correct input data', async () => {


        const data: BlogInputModel = { 
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }


        const respons = await request(app)
            .post(ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.CREATED_201)

         
        newEntity2 = respons.body 


        expect(newEntity2).toEqual(
                {
                    id: expect.any(String),
                    name: newEntity2.name,
                    description: newEntity2.description,
                    websiteUrl: newEntity2.websiteUrl 
                }
            )
            
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [newEntity1, newEntity2])   
            
    })

  
    it('should not update entity with incorrect input data', async () => {

        const data: BlogInputModel = { 
            name: 'name',
            description: '',
            websiteUrl: 'https://samurai.it-incubator.io/'
        }  


        await request(app)
            .put(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
         

            await request(app)
                .get(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
                .expect(HTTP_STATUSES.OK_200, newEntity1)

    })


    it('should not update entity that not exist', async () => {

        await request(app)
            .put(`${ROUTER_PATH.blogs}/17`)
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
            .put(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send( data )
            .expect(HTTP_STATUSES.NO_CONTENT_204)



        await request(app)
            .get(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
            .expect(HTTP_STATUSES.OK_200,
                                {   ...newEntity1,
                                    name: data.name,
                                    description: data.description,
                                    websiteUrl: data.websiteUrl
                                }
        )

        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [
                {   ...newEntity1,
                    name: data.name,
                    description: data.description,
                    websiteUrl: data.websiteUrl
                }, 
                newEntity2])

      
        
        
        await request(app)
            .get(`${ROUTER_PATH.blogs}/${newEntity2.id}`)
            .expect(HTTP_STATUSES.OK_200, newEntity2)

    })
    
    
    
    it('should delete both entityes', async () => {
        await request(app)
            .delete(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)


        await request(app)
            .get(`${ROUTER_PATH.blogs}/${newEntity1.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)   
            
            
        await request(app)
            .delete(`${ROUTER_PATH.blogs}/${newEntity2.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)    


        await request(app)
            .get(`${ROUTER_PATH.blogs}/${newEntity2.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404) 

           
        await request(app)
            .get(ROUTER_PATH.blogs)
            .expect(HTTP_STATUSES.OK_200, [])     
    })


})