import { useEffect, useState } from "react"
import { Movie as IMovie } from "../@types/movie"
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

interface MovieProps {
    data: IMovie
}

export const Movie: React.FC<MovieProps> = ({ data: movie }) => {
    const [showYt, setShowYt] = useState(false)

    useEffect(() => {
        setShowYt(false)
        setTimeout(() => setShowYt(true), 300)
    }, [movie])

    return (
        <div className="movie" key={`movie-id-${movie.id}`}>

            <div className="poster" >
                <md-elevation></md-elevation>
                <img src={proxyImage(movie.art.poster.replace('original', 'w500'))} />
            </div>
            <div className="rating-container"><span>Рейтинг</span>Голосов {movie.votes}<Rating rating={movie.rating} /></div>
            <div className="title">{movie.title}</div>
            <div className="original-title">{movie.originalTitle}</div>
            <div className="subtitle">{movie.subtitle}</div>
            <div className="duration"><span>Длительность</span>{movie.duration.toHHMMSS()}</div>
            <div className="genre"><span>Жанр</span>{movie.genre}</div>
            <div className="premiered"><span>Дата премьеры</span>{new Date(movie.premiered).toLocaleString('ru', { dateStyle: 'long' })}</div>
            <div className="studio"><span>Студия</span>{movie.studio}</div>
            <div className="country"><span>Страна</span>{movie.country}</div>
            <div className="youtube">
                <md-elevation />
                {showYt && <iframe
                    src={`https://www.youtube-nocookie.com/embed/${movie.youtube.split('=').pop()}?controls=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                </iframe>}
            </div>

            <div className="desc"><span>Обзор</span>{movie.description}</div>

        </div>
    )
}

export default Movie