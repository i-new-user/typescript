"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogs = [
    { id: '1', name: 'Тома', description: 'Интересные рецепты, тонкости приготовления разнообразных блюд и самые неожиданные кулинарные решения! Читайте наш блог.', websiteUrl: 'https://cookhouse.ru/blog/' },
    { id: '2', name: 'Клава', description: 'Простые и вкусные рецепты, авторские рецепты с фото, а также лучшие проверенные рецепты.', websiteUrl: 'https://kulinarniiblog.com/' },
    { id: '3', name: 'Тося', description: 'Кулинарный блог онлайн-школы ЩиБорщи ', websiteUrl: 'https://www.schiborschi.online/blog/' },
];
exports.blogsRepository = {
    findBlogs() {
        return blogs;
    },
    findBlogById(id) {
        let blog = blogs.find(blog => id === blog.id);
        return blog;
    },
    createBlog(id, name, description, websiteUrl) {
        const newBlog = {
            id: String(+(new Date())),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name, description, websiteUrl) {
        let blog = blogs.find(p => p.id === id);
        if (blog) {
            blog.name = name,
                blog.description = description,
                blog.websiteUrl = websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    deleteAllBlogs() {
        return blogs.splice(0, blogs.length);
    }
};
