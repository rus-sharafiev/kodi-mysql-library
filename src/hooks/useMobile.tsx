import { useEffect, useState } from "react"

// --------------------------------------------------------------------------------

export const useMobile = (width: number) => {
    const [mobile, setMobile] = useState(window.matchMedia(`(max-width: ${width}px)`).matches)

    useEffect(() => {
        const updateTableView = () => {
            if (window.matchMedia(`(max-width: ${width}px)`).matches) {
                setMobile(true)
            } else {
                setMobile(false)
            }
        }

        updateTableView()
        window.addEventListener('resize', updateTableView)
        return () => window.removeEventListener('resize', updateTableView)
    }, [])

    return mobile
}

export default useMobile