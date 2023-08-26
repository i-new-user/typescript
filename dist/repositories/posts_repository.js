"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db = {
    posts: [
        {
            id: '1',
            title: 'Cats',
            shortDescription: 'parrot Cats',
            content: 'The cat (Felis catus) is a domestic species of small carnivorous mammal.[1][2] It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family.',
            blogId: '001',
            blogName: 'Tom'
        },
        {
            id: '2',
            title: 'Dogs',
            shortDescription: 'parrot Dogs',
            content: 'The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf. Also called the domestic dog, it is derived from the extinct Pleistocene wolf, and the modern wolf is the dog',
            blogId: 'Stiv',
            blogName: '002'
        },
        {
            id: '3',
            title: 'parrots',
            shortDescription: 'parrot life',
            content: 'Parrots, also known as psittacines ,[1][2] are birds of the roughly 398 species[3] in 92 genera comprising the order Psittaciformes , found mostly in tropical and subtropical regions. ',
            blogId: 'Elena',
            blogName: '003'
        }
    ]
};
exports.postsRepository = {
    findPosts() {
        return db.posts;
    },
    createPost(title, shortDescription, content, blogId, blogName) {
        let newPost = {
            id: String(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
        };
        db.posts.push(newPost);
        return newPost;
    },
    findPostById(id) {
        return db.posts.find(post => post.id === id);
    },
    updatePost(id, title, shortDescription, content, blogId) {
        let post = db.posts.find(post => post.id === id);
        if (post) {
            post.title = title,
                post.shortDescription = shortDescription,
                post.content = content,
                post.blogId = blogId;
            return true;
        }
        return false;
    },
    deletePostById(id) {
        let indexPost = db.posts.findIndex(post => post.id === id);
        if (indexPost === -1) {
            return false;
        }
        db.posts.splice(indexPost, 1);
        return true;
    },
    deleteAllPostsRouter() {
        return db.posts.splice(0, db.posts.length);
    }
};
