import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../store"
import { useGetMoviesQuery } from "../store/api/api"
import { hideBottomSheet, setBottomSheetData } from "../store/reducers/bottomSheetSlice"
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"
import { useEffect, useRef } from "react"

// --------------------------------------------------------------------------------

export const Movies: React.FC = () => {
    const { data: movies } = useGetMoviesQuery()
    const dispatch = useAppDispatch()
    const { slug } = useParams()
    const nav = useNavigate()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!slug) dispatch(hideBottomSheet())
    }, [slug])

    return (
        <div className="cards" ref={ref}>
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