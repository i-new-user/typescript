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
//создает блок который группирует несколько связанных тестов
describe('test for /blogs', () => {
    //запускает функцию перед каждым тестом в этом файле
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete(app_1.ROUTER_PATH.test);
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.blogs)
            .expect(statuses_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not existing entity', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.blogs}/1`)
            .expect(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('should not create entity with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post(app_1.ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send({
            name: '',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        })
            .expect(statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.blogs)
            .expect(statuses_1.HTTP_STATUSES.OK_200, []);
    }));
    let newEntity1 = null;
    let newEntity2 = null;
    it('should create entity1 with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        };
        const respons = yield (0, supertest_1.default)(app_1.app)
            .post(app_1.ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(data)
            .expect(statuses_1.HTTP_STATUSES.CREATED_201);
        newEntity1 = respons.body;
        expect(newEntity1).toEqual({
            id: expect.any(String),
            name: newEntity1.name,
            description: newEntity1.description,
            websiteUrl: newEntity1.websiteUrl
        });
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.blogs)
            .expect(statuses_1.HTTP_STATUSES.OK_200, [newEntity1]);
    }));
    it('should create entity2 with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        };
        const respons = yield (0, supertest_1.default)(app_1.app)
            .post(app_1.ROUTER_PATH.blogs)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(data)
            .expect(statuses_1.HTTP_STATUSES.CREATED_201);
        newEntity2 = respons.body;
        expect(newEntity2).toEqual({
            id: expect.any(String),
            name: newEntity2.name,
            description: newEntity2.description,
            websiteUrl: newEntity2.websiteUrl
        });
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.blogs)
            .expect(statuses_1.HTTP_STATUSES.OK_200, [newEntity1, newEntity2]);
    }));
    it('should not update entity with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: 'name',
            description: '',
            websiteUrl: 'https://samurai.it-incubator.io/'
        };
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.ROUTER_PATH.blogs}/${newEntity1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(data)
            .expect(statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.blogs}/${newEntity1.id}`)
            .expect(statuses_1.HTTP_STATUSES.OK_200, newEntity1);
    }));
    it('should not update entity that not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.ROUTER_PATH.blogs}/17`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send({
            name: 'name',
            description: 'description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        })
            .expect(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('should  update entity with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: 'update name',
            description: 'update description',
            websiteUrl: 'https://samurai.it-incubator.io/'
        };
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.ROUTER_PATH.blogs}/${newEntity1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .send(data)
            .expect(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.blogs}/${newEntity1.id}`)
            .expect(statuses_1.HTTP_STATUSES.OK_200, Object.assign(Object.assign({}, newEntity1), { name: data.name, description: data.description, websiteUrl: data.websiteUrl }));
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.blogs)
            .expect(statuses_1.HTTP_STATUSES.OK_200, [
            Object.assign(Object.assign({}, newEntity1), { name: data.name, description: data.description, websiteUrl: data.websiteUrl }),
            newEntity2
        ]);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.blogs}/${newEntity2.id}`)
            .expect(statuses_1.HTTP_STATUSES.OK_200, newEntity2);
    }));
    it('should delete both entityes', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.ROUTER_PATH.blogs}/${newEntity1.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.blogs}/${newEntity1.id}`)
            .expect(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.ROUTER_PATH.blogs}/${newEntity2.id}`)
            .set('Authorization', `Basic ${'YWRtaW46cXdlcnR5'}`)
            .expect(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.ROUTER_PATH.blogs}/${newEntity2.id}`)
            .expect(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.ROUTER_PATH.blogs)
            .expect(statuses_1.HTTP_STATUSES.OK_200, []);
    }));
});
