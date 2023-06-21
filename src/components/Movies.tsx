import { useGetMoviesQuery } from "../store/api/api"
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

export const Movies: React.FC = () => {
    const { data: movies, isFetching } = useGetMoviesQuery()

    return (
        <div className="cards">
            {movies && movies.map(movie =>
                <div className="card" key={`movie-${movie.id}`}>
                    <div className="poster">
                        <md-elevation></md-elevation>
                        <img src={proxyImage(movie.art.poster.replace('original', 'w300'))} />
                    </div>
                    <div className="desc">
                        <div className="title body-small">{movie.title}</div>
                        <Rating rating={movie.rating} />
                    </div>
                </div>
            )}
        </div>
    )
}