import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store"
import Movie from "./Movie"

// --------------------------------------------------------------------------------

export const BottomSheet: React.FC = () => {
    const { movie, tv, season, isVisible } = useAppSelector(state => state.bottomSheet)
    const nav = useNavigate()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isVisible)
        isVisible && ref.current && ref.current.scrollTo(0, 0)
    }, [isVisible])

    return (
        <div className={isVisible ? 'bottom-sheet' : 'bottom-sheet hidden'} ref={ref}>

            <md-standard-icon-button onClick={() => nav(-1)}>
                <md-icon>close</md-icon>
            </md-standard-icon-button>
            {!!movie && <Movie data={movie} />}
        </div>
    )
}

export default BottomSheet