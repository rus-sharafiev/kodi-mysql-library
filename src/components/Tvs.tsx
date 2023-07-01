import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../store"
import { useGetTvsQuery } from "../store/api/api"
import { hideBottomSheet, setBottomSheetData } from "../store/reducers/bottomSheetSlice"
//components
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

export const Tvs: React.FC = () => {
    const { pathname } = useLocation()
    const { data: tvs } = useGetTvsQuery('', { skip: pathname !== '/tvs' })
    const dispatch = useAppDispatch()
    const { slug } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        if (!slug) dispatch(hideBottomSheet())
    }, [slug])

    return (
        <div className="cards">
            {tvs && tvs.map(tv =>
                <div className="card" key={`tv-${tv.id}`}>
                    <div className="poster" onClick={() => {
                        dispatch(setBottomSheetData({ tv }))
                        nav(`/tvs/${tv.originalTitle.replaceAll(' ', '_')}`)
                    }}>
                        <md-ripple></md-ripple>
                        <md-elevation></md-elevation>
                        <img src={proxyImage(tv.art.poster.replace('original', 'w300'))} />
                    </div>
                    <div className="desc">
                        <div className="title body-small">{tv.title}</div>
                        <Rating rating={tv.rating} />
                    </div>
                </div>
            )}
        </div>
    )
}