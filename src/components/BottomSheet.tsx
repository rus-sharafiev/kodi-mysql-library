import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store"
//components
import Movie from "./Movie"
import Tv from "./Tv"
import useSwipe from "../hooks/useSwipe"

// --------------------------------------------------------------------------------



export const BottomSheet: React.FC = () => {
    const { movie, tv, season, isVisible } = useAppSelector(state => state.bottomSheet)
    const ref = useRef<HTMLDivElement>(null)
    const [handleTouchStart, handleTouchMove, handleTouchEnd] = useSwipe(ref)
    const nav = useNavigate()

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isVisible)
        isVisible && ref.current && ref.current.scrollTo(0, 0)

        const handleScroll = () => {
            document.getElementById('swipe-area')?.classList.toggle(
                'hidden', !!ref.current && ref.current.scrollTop > 20)
        }

        if (isVisible)
            ref.current?.addEventListener('scroll', handleScroll)
        else
            ref.current?.removeEventListener('scroll', handleScroll)

    }, [isVisible])

    return (
        <div
            className={isVisible ? 'bottom-sheet' : 'bottom-sheet hidden'}
            ref={ref}
        >
            <md-standard-icon-button onClick={() => nav(-1)}>
                <md-icon>close</md-icon>
            </md-standard-icon-button>
            {!!movie && <Movie data={movie} />}
            {!!tv && <Tv data={tv} />}
            {isVisible && <div
                id="swipe-area"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />}
        </div>
    )
}

export default BottomSheet