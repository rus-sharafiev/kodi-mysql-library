import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { hideBottomSheet, resetBottomSheetData } from "../store/reducers/bottomSheetSlice"
import Movie from "./Movie"

// --------------------------------------------------------------------------------

export const BottomSheet: React.FC = () => {
    const { movie, tv, season, isVisible } = useAppSelector(state => state.bottomSheet)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isVisible)
            document.body.classList.add('no-scroll')
        else
            setTimeout(() => {
                document.body.removeAttribute('class')
                dispatch(resetBottomSheetData())
            }, 300)

    }, [isVisible])

    return (
        <div className={isVisible ? 'bottom-sheet' : 'bottom-sheet hidden'}>

            <md-standard-icon-button onClick={() => dispatch(hideBottomSheet())}>
                <md-icon>close</md-icon>
            </md-standard-icon-button>
            {movie && <Movie data={movie} />}
        </div>
    )
}

export default BottomSheet