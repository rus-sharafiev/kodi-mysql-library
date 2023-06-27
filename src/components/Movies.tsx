import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../store"
import { useGetMoviesQuery } from "../store/api/api"
import { hideBottomSheet, setBottomSheetData } from "../store/reducers/bottomSheetSlice"
//components
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

export const Movies: React.FC = () => {
    const { pathname } = useLocation()
    const { data: movies } = useGetMoviesQuery('', { skip: pathname !== '/movies' })
    const dispatch = useAppDispatch()
    const { slug } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        if (!slug) dispatch(hideBottomSheet())
    }, [slug])

    return (
        <div className="cards">
            {movies && movies.map(movie =>
                <div className="card" key={`movie-${movie.id}`}>
                    <div className="poster" onClick={() => {
                        dispatch(setBottomSheetData({ movie }))
                        nav(`/movies/${movie.originalTitle.replaceAll(' ', '_')}`)
                    }}>
                        <md-ripple></md-ripple>
                        <md-elevation></md-elevation>
                        <img src={proxyImage(movie.art.poster.replace('original', 'w300'))} />
                    </div>
                    <div className="desc">
                        <div className="title body-small">{movie.title}</div>
                        <Rating rating={movie.rating} />
                    </div>
                </div>)}
        </div>
    )
}