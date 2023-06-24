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

// components
import { Header } from './components/Header'
import { Cards } from './components/Cards'
import BottomSheet from './components/BottomSheet'

// ----------------------------------------------------------------------

registerSwiper()

export const App: React.FC = () => {

    return (
        <>
            <Header />
            <Cards />
            <BottomSheet />
        </>
    )
}