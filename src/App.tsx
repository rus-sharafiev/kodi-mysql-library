import { Outlet } from 'react-router-dom'

// main style
import './@styles/index.less'

// @material
import "@material/web/tabs/tabs"
import "@material/web/tabs/tab"
import "@material/web/icon/icon"

// components
import { Header } from './components/Header'

// ----------------------------------------------------------------------

export const App: React.FC = () => {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}