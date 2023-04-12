export type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null | undefined,
    createAt?: string,
    publicationDate?: string,
    availableReaolutions: ResolutionsType
}
export type ResolutionsType = Array<string>