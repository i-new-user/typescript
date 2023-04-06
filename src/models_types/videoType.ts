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
type ResolutionsType = Array<string>