import { Movie as IMovie } from "../@types/movie"
import proxyImage from "../utils/proxyImage"

// --------------------------------------------------------------------------------

interface MovieProps {
    data: IMovie
}

export const Movie: React.FC<MovieProps> = ({ data: movie }) => {
    return (
        <div className="movie">

            <div className="poster" >
                <md-elevation></md-elevation>
                <img src={proxyImage(movie.art.poster.replace('original', 'w300'))} />
            </div>
        </div>
    )
}

export default Movie