"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const statuses_1 = require("../../http/statuses");
const post_test_manager_1 = require("./post_test_manager");
//создает блок который группирует несколько связанных тестов
describe('test for /posts', () => {
    //запускает функцию перед каждым тестом в этом файле
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete(app_1.ROUTER_PATH.test);
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.posts)
            .expect(statuses_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not existing entity', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.posts}/1`)
            .expect(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('should not create entity with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            title: '',
            shortDescription: 'create shortDescription',
            content: 'create content',
            blogId: ''
        };
        yield post_test_manager_1.postTestManager.createPost(data, statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.posts)
            .expect(statuses_1.HTTP_STATUSES.OK_200, []);
    }));
    let createPost1 = null;
    let createPost2 = null;
    it('should create entity1 with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            title: 'create title 1111',
            shortDescription: 'create shortDescription 1111',
            content: 'create content 1111',
            blogId: ''
        };
        const result = yield post_test_manager_1.postTestManager.createPost(data, statuses_1.HTTP_STATUSES.CREATED_201);
        createPost1 = result.createEntity;
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.posts)
            .expect(statuses_1.HTTP_STATUSES.OK_200, [createPost1]);
    }));
    it('should create entity2 with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            title: 'create title 2222',
            shortDescription: 'create shortDescription 2222',
            content: 'create content 2222',
            blogId: ''
        };
        const result = yield post_test_manager_1.postTestManager.createPost(data, statuses_1.HTTP_STATUSES.CREATED_201);
        createPost2 = result.createEntity;
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.posts)
            .expect(statuses_1.HTTP_STATUSES.OK_200, [createPost1, createPost2]);
    }));
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
});
