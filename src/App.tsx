// main style
import './@styles/index.less'

// @material
import "@material/web/tabs/tabs"
import "@material/web/tabs/tab"
import "@material/web/icon/icon"
import "@material/web/elevation/elevation"

// Swiper
import { register as registerSwiper } from 'swiper/element/bundle'

// components
import { Header } from './components/Header'
import { Cards } from './components/Cards'

// ----------------------------------------------------------------------

registerSwiper()

export const App: React.FC = () => {

    return (
        <>
            <Header />
            <Cards />
        </>
    )
}