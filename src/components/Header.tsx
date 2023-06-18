import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

// --------------------------------------------------------------------------------

export const Header: React.FC = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const header = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        !!header.current && header.current.classList.toggle(
            'scrolled',
            header.current.getBoundingClientRect().top < -20
        )
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header ref={header}>
            <div className="logo"></div>
            <md-tabs>
                <md-tab onClick={() => nav('/movies')}>
                    <md-icon slot="icon">movie</md-icon>
                    Фильмы
                </md-tab>
                <md-tab onClick={() => nav('/tvs')}>
                    <md-icon slot="icon">videocam</md-icon>
                    Сериалы
                </md-tab>
            </md-tabs>
        </header>
    )
}