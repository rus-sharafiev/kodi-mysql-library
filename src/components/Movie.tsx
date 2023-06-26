import { useLocation, useParams } from "react-router-dom"
import { Movie as IMovie } from "../@types/movie"
import proxyImage from "../utils/proxyImage"
import { useEffect } from "react"

// --------------------------------------------------------------------------------

interface MovieProps {
    data: IMovie
}

export const Movie: React.FC<MovieProps> = ({ data: movie }) => {

    return (
        <div className="movie">

            <div className="poster" >
                <md-elevation></md-elevation>
                <img src={proxyImage(movie.art.poster.replace('original', 'w500'))} />
            </div>
            <div className="title">{movie.title}</div>
            <div className="original-title">{movie.originalTitle}</div>
            <div className="subtitle">{movie.subtitle}</div>
            <div className="duration"><span>Длительность</span>{movie.duration.toHHMMSS()}</div>
            <div className="country">{movie.country}</div>
            <div className="genre">{movie.genre}</div>
            <div className="premiered"><span>Дата премьеры</span>{new Date(movie.premiered).toLocaleString('ru', { dateStyle: 'long' })}</div>
            <div className="studio"><span>Студия</span>{movie.studio}</div>
            <div className="youtube">{movie.youtube}</div>

            <div className="desc">{movie.description}</div>

        </div>
    )
}

export default Movie