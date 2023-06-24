import { useAppDispatch } from "../store"
import { useGetTvsQuery } from "../store/api/api"
import { setBottomSheetData } from "../store/reducers/bottomSheetSlice"
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

export const Tvs: React.FC = () => {
    const { data: tvs, isFetching } = useGetTvsQuery()
    const dispatch = useAppDispatch()

    return (
        <div className="cards">
            {tvs && tvs.map(tv =>
                <div className="card" key={`tv-${tv.id}`}>
                    <div className="poster" onClick={() => dispatch(setBottomSheetData({ tv }))}>
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