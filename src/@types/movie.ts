export interface Movie {
    id: number
    art: {
        thumb: string
        banner: string
        fanart: string
        keyart: string
        poster: string
        discart: string
        clearart: string
        clearlogo: string
        landscape: string
    }
    genre: string
    title: string
    votes: number
    rating: number
    studio: string
    writer: string
    country: string
    youtube: string
    director: string
    pgRating: string
    subtitle: string
    dateAdded: string
    playCount: number
    premiered: string
    lastPlayed: string
    ratingType: string
    description: string
    originalTitle: string
    totalTimeInSeconds: number
    resumeTimeInSeconds: number
}