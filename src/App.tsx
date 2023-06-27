// main style
import './@styles/index.less'

// @material
import "@material/web/tabs/tabs"
import "@material/web/tabs/tab"
import "@material/web/icon/icon"
import "@material/web/ripple/ripple"
import "@material/web/elevation/elevation"
import "@material/web/iconbutton/standard-icon-button"

// Swiper
import { register as registerSwiper } from 'swiper/element/bundle'

// Service worker
import { Workbox } from 'workbox-window'

// utils
import './utils'

// components
import { useLocation, useNavigate } from 'react-router-dom'
import { Cards } from './components/Cards'
import { Header } from './components/Header'
import { BottomSheet } from './components/BottomSheet'
import { useEffect } from 'react'

// ----------------------------------------------------------------------

registerSwiper()

// if ('serviceWorker' in navigator) {
//     const wb = new Workbox('/sw.js')
//     wb.register()
// }

export const App: React.FC = () => {
    const { pathname } = useLocation()
    const nav = useNavigate()

    useEffect(() => {
        if (pathname === '/' || pathname.split('/').length !== 2)
            nav('/movies', { replace: true })
    }, [])

    return (
        <>
            <Header />
            <Cards />
            <BottomSheet />
        </>
    )
}