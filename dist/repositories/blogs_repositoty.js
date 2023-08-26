"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db = {
    blogs: [
        {
            id: '1',
            name: 'football',
            description: 'fk Dinamo',
            websiteUrl: 'https://fcdm.ru/',
        },
        {
            id: '2',
            name: 'hockey',
            description: 'khl Torpedo',
            websiteUrl: 'https://www.khl.ru/clubs/torpedo/'
        },
        {
            id: '3',
            name: 'volleyball',
            description: 'volleyball clab',
            websiteUrl: 'https://www.fakelvolley.ru/'
        }
    ]
};
exports.blogsRepository = {
    findBlogs() {
        return db.blogs;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: String(new Date()),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        db.blogs.push(newBlog);
        return newBlog;
    },
    findBlogById(id) {
        return db.blogs.find(b => b.id === id);
    },
    updateBlog(id, name, description, websiteUrl) {
        let blog = db.blogs.find(blog => blog.id === id);
        if (blog) {
            blog.name = name,
                blog.description = description,
                blog.websiteUrl = websiteUrl;
            return true;
        }
        return false;
    },
    deleteBlogById(id) {
        let indexBlogs = db.blogs.findIndex(blog => blog.id === id);
        if (indexBlogs === -1) {
            return false;
        }
        db.blogs.splice(indexBlogs, 1);
        return true;
    },
    deleteAllBlogsRouter() {
        return db.blogs.splice(0, db.blogs.length);
    }
};
