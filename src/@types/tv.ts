export interface Tv {
    id: number
    art: {
        banner: string
        fanart: string
        poster: string
        clearart: string
        clearlogo: string
        landscape: string
        characterart: string
    }
    genre: string
    title: string
    votes: number
    rating: number
    studio: string
    seasons: Season[]
    youtube: string
    pgRating: string
    dateAdded: string
    premiered: string
    lastPlayed: string
    ratingType: string
    totalCount: number
    description: string
    totalSeasons: number
    watchedcount: number
    originalTitle: string
}

export interface Season {
    art: {
        thumb: string
        banner: string
        poster: string
        landscape: string
    }
    mpaa: string
    name: string
    plot: string
    aired: string
    genre: string
    idShow: number
    season: number
    studio: string
    strPath: string
    episodes: Episode[]
    idSeason: number
    playCount: number
    premiered: string
    showTitle: string
    userrating: number
}

export interface Episode {
    mpaa: string
    genre: string
    title: string
    votes: number
    idFile: number
    idShow: number
    rating: number
    studio: string
    strPath: string
    idSeason: number
    strTitle: string
    dateAdded: string
    idEpisode: number
    playCount: number
    premiered: string
    lastPlayed: string
    userrating: number
    description: string
    playerState: number
    rating_type: string
    strFileName: string
    uniqueid_type: string
    uniqueid_value: string
    totalTimeInSeconds: number
    resumeTimeInSeconds: number
}