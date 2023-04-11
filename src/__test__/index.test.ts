
import request from 'supertest'
import {app} from '../app'


describe('/videos', () => {

    beforeAll( async () => {
        await request(app).delete('/testing/all-data')
    })

    it('should return 200', async () => {
        await request(app)
            .get('/')
            expect('EXPRESS')
    })
        
            
      

})

    // beforeAll( async () => {
    //     await  request(app).delete('/testing/all-data')
    // })
    
    // it('should return 404', async () => {
    //     await request(app)
    //         .get('/vide')
    //         .expect(404)
    // })

    
   


    //Выполнить перед каждым тестом
    // beforeEach( () => {

    // })

    // //Выполнить один раз перед всеми тестами
    // beforeAll( () => {

    // })

     // //Выполнить после каждого теста 
    // afterEach( () => {

    // })

    // //Выполнить один раз после всех тестов 
    // afterAll( () => {

    // })