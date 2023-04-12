export type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null | undefined,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions: ResolutionsType
}
export type ResolutionsType = Array<string>