"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRepository = void 0;
const db = {
    videos: [
        {
            id: 1,
            title: 'Мёртвые души',
            author: 'Николай Васильевич Гоголь',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
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
            createdAt: new Date().toISOString(),
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
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + (3600 * 1000 * 24)).toISOString(),
            availableResolutions: [
                'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'
            ]
        }
    ]
};
exports.videosRepository = {
    findVideos() {
    }
};
