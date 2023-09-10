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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db_1 = require("./../db");
const mongodb_1 = require("mongodb");
let __blogs = [
    { id: '1', name: 'Тома', description: 'Интересные рецепты, тонкости приготовления разнообразных блюд и самые неожиданные кулинарные решения! Читайте наш блог.', websiteUrl: 'https://cookhouse.ru/blog/', createdAt: String(new Date()), isMembership: false },
    { id: '2', name: 'Клава', description: 'Простые и вкусные рецепты, авторские рецепты с фото, а также лучшие проверенные рецепты.', websiteUrl: 'https://kulinarniiblog.com/', createdAt: String(new Date()), isMembership: false },
    { id: '3', name: 'Тося', description: 'Кулинарный блог онлайн-школы ЩиБорщи ', websiteUrl: 'https://www.schiborschi.online/blog/', createdAt: String(new Date()), isMembership: false },
];
exports.blogsRepository = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.blogsCollection.find({}).toArray();
            return blogs.map(blog => ({
                id: String(blog._id),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            }));
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (blog) {
                return {
                    id: String(blog._id),
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                    createdAt: new Date().toISOString(),
                    isMembership: blog.isMembership
                };
            }
            else {
                return null;
            }
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                _id: new mongodb_1.ObjectId(),
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const result = yield db_1.blogsCollection.insertOne(newBlog);
            return {
                id: String(result.insertedId),
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogsCollection.deleteMany({});
        });
    }
};
