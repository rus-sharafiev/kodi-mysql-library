import { useAppDispatch } from "../store"
import { useGetMoviesQuery } from "../store/api/api"
import { setBottomSheetData } from "../store/reducers/bottomSheetSlice"
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

export const Movies: React.FC = () => {
    const { data: movies, isFetching } = useGetMoviesQuery()
    const dispatch = useAppDispatch()

    return (
        <div className="cards">
            {movies && movies.map(movie =>
                <div className="card" key={`movie-${movie.id}`}>
                    <div className="poster" onClick={() => dispatch(setBottomSheetData({ movie }))}>
                        <md-ripple></md-ripple>
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