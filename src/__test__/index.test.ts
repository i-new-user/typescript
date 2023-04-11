
import request from 'supertest'
import {app} from '../app'


describe('/videos', () => {

    beforeAll( async () => {
        await request(app).delete('/testing/all-data')
    })

    it('should return 200', async () => {
        await request(app)
            .get('/')
            .expect(200)
    })
        
            
    it('should return 200 and objects', async () => {
        const res = await request(app)
            .get('/videos')
           
            .expect( 200)
            // .expect( 200,[
            //     {
            //         id: 1,
            //         title: 'Мёртвые души',
            //         author: 'Николай Васильевич Гоголь',
            //         canBeDownloaded: true,
            //         minAgeRestriction: null,
            //         createAt: new Date().toISOString(),
            //         publicationDate:  new Date( Date.now() + (3600 * 1000 * 24)).toISOString(),
            //         availableResolutions: [
            //             'P144',
            //         ]
            //     }, 
            //     {
            //         id: 2,
            //         title: 'Русслан и Людмила',
            //         author: 'Пушкин Александр Сергеевич',
            //         canBeDownloaded: true,
            //         minAgeRestriction: null,
            //         createAt: new Date().toISOString(),
            //         publicationDate: new Date( Date.now() + (3600 * 1000 * 24)).toISOString(),
            //         availableResolutions: [
            //             'P144', 'P240'
            //         ]
            //     },
            //     {
            //         id:  3,
            //         title: 'Тихий дон',
            //         author: 'Шолохов Михаил Александрович',
            //         canBeDownloaded: true,
            //         minAgeRestriction: null,
            //         createAt: new Date().toISOString(), 
            //         publicationDate:new Date( Date.now() + (3600 * 1000 * 24)).toISOString(),
            //         availableResolutions: [
            //             'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' 
            //         ]
            //     }
            // ] )
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