import { useNavigate } from "react-router-dom"

// --------------------------------------------------------------------------------

export const useSwipe = (ref: React.RefObject<HTMLDivElement>) => {
    const nav = useNavigate()

    let el: HTMLDivElement | null = null
    let y: number = 0,
        yPrev: number = 0,
        top: number = 0

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        el = e.currentTarget
        if (el) top = el.offsetTop
        yPrev = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (el && ref.current) {
            y = yPrev - e.touches[0].clientY
            yPrev = e.touches[0].clientY
            el.style.top = (el.offsetTop - y) + "px"
            ref.current.style.top = (el.offsetTop - y) + "px"
            ref.current.style.transition = 'none'
        }
    }

    const handleTouchEnd = () => {
        if (el && ref.current) {
            if (ref.current.getBoundingClientRect().top > 50) nav(-1)
            el = null
            ref.current.removeAttribute('style')
        }
    }

    return [handleTouchStart, handleTouchMove, handleTouchEnd] as const

}

export default useSwipe