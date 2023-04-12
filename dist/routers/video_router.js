"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../HTTP/http_statuses");
exports.videosRouter = (0, express_1.Router)({});
const db = {
    videos: [
        {
            id: 1,
            title: 'Мёртвые души',
            author: 'Николай Васильевич Гоголь',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + (3600 * 1000 * 24)).toISOString(),
            availableResolutions: [
                'P144',
            ]
        },
        {
            id: 2,
            title: 'Русслан и Людмила',
            author: 'Пушкин Александр Сергеевич',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + (3600 * 1000 * 24)).toISOString(),
            availableResolutions: [
                'P144', 'P240'
            ]
        },
        {
            id: 3,
            title: 'Тихий дон',
            author: 'Шолохов Михаил Александрович',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + (3600 * 1000 * 24)).toISOString(),
            availableResolutions: [
                'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'
            ]
        }
    ]
};
exports.videosRouter.get('/', (req, res) => {
    res.send('EXPRESS');
});
exports.videosRouter.get('/', (req, res) => {
    res.send(db.videos);
});
exports.videosRouter.post('/', (req, res) => {
    const errors = { errorsMessages: [] };
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    if (!title || typeof title !== 'string' || title.trim() === '' || title.length > 40) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "title"
        });
    }
    if (!author || typeof author !== 'string' || author.trim() === '' || author.length > 20) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "author"
        });
    }
    if (!Array.isArray(availableResolutions) || availableResolutions.length < 1) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "availableResolutions"
        });
    }
    for (let elem of availableResolutions) {
        if (elem.length > 5) {
            errors.errorsMessages.push({
                "message": "error",
                "field": "availableResolutions"
            });
        }
    }
    if (errors.errorsMessages.length > 0) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
    }
    else {
        const newVideo = {
            id: +(new Date),
            title: title,
            author: author,
            availableResolutions: availableResolutions,
        };
        console.log(newVideo);
        db.videos.push(newVideo);
        res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newVideo);
    }
});
exports.videosRouter.put('/:id', (req, res) => {
    const errors = { errorsMessages: [] };
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;
    if (!title || typeof title !== 'string' || title.trim() === '' || title.length > 40) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "title"
        });
    }
    if (!author || typeof author !== 'string' || author.trim() === '' || author.length > 20) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "author"
        });
    }
    if (!Array.isArray(availableResolutions) || availableResolutions.length < 1) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "availableResolutions"
        });
    }
    if (typeof canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            "message": "error",
            "field": "canBeDownloaded"
        });
    }
    if (typeof minAgeRestriction !== 'number' || (minAgeRestriction < 1 || minAgeRestriction > 18)) {
        errors.errorsMessages.push({
            "message": "error",
            "field": "minAgeRestriction"
        });
    }
    if (typeof publicationDate !== 'string' || publicationDate.trim() === '') {
        errors.errorsMessages.push({
            "message": "error",
            "field": "publicationDate"
        });
    }
    if (errors.errorsMessages.length > 0) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(errors);
    }
    const video = db.videos.find(v => v.id === +req.params.id);
    if (!video) {
        res.send(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        video.title = title,
            video.author = author,
            video.availableResolutions = availableResolutions,
            video.canBeDownloaded = canBeDownloaded,
            video.minAgeRestriction = minAgeRestriction,
            video.publicationDate = publicationDate,
            console.log(video);
        res.send(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
});
exports.videosRouter.get('/:id', (req, res) => {
    const video = db.videos.find(v => v.id === +req.params.id);
    // console.log(video)
    if (!video) {
        res.send(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    else {
        res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(video);
    }
});
exports.videosRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1);
            res.send(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.send(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});
exports.videosRouter.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
