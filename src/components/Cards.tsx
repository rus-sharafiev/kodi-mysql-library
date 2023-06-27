import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Movies } from "./Movies"
import { Tvs } from "./Tvs"
import { Swiper } from "swiper"
import { SwiperEvents } from "swiper/types"
import { MdTab } from "@material/web/tabs/tabs"

// --------------------------------------------------------------------------------

type Tabs = Omit<MdTab, 'selected'> & { selected: number, addEventListener: any }

export const Cards: React.FC = () => {
    const nav = useNavigate()
    const { pathname: type } = useLocation()
    const [activeIndex, setActiveIndex] = useState(0)
    const main = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<HTMLElement & { swiper: Swiper }>(null)
    const tabsRef = useRef<HTMLElement & Tabs>(null)

    const handleScroll = () => {
        !!main.current && main.current.classList.toggle(
            'scrolled',
            main.current.getBoundingClientRect().top < -30
        )
    }

    const handleTabsChanged = (e: Event) => {
        const tabs = e.currentTarget as Tabs
        nav(tabs.selected === 0 ? '/movies' : '/tvs')
    }

    const handleSlideChanged = (e: Event) => {
        const swiper = (e.currentTarget as EventTarget & { swiper: Swiper }).swiper
        nav(swiper.activeIndex === 0 ? '/movies' : '/tvs')
    }

    useEffect(() => {
        if (!swiperRef.current || !tabsRef.current) return

        if (type === '/movies') {
            tabsRef.current.selected = 0
            swiperRef.current.swiper.slideTo(0)
        }
        if (type === '/tvs') {
            tabsRef.current.selected = 1
            swiperRef.current.swiper.slideTo(1)
        }

    }, [type])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        tabsRef.current?.addEventListener('change', handleTabsChanged)
        swiperRef.current?.addEventListener('slidechange', handleSlideChanged)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            tabsRef.current?.addEventListener('change', handleTabsChanged)
            swiperRef.current?.addEventListener('slidechange', handleSlideChanged)
        }
    }, [])

    return (
        <main ref={main}>
            <div id="tabs">
                <md-tabs ref={tabsRef}>
                    <md-tab>
                        <md-icon slot="icon">movie</md-icon>
                        Фильмы
                    </md-tab>
                    <md-tab>
                        <md-icon slot="icon">videocam</md-icon>
                        Сериалы
                    </md-tab>
                </md-tabs>
            </div>
            <div id="cards">
                <swiper-container ref={swiperRef}>
                    <swiper-slide><Movies /></swiper-slide>
                    <swiper-slide><Tvs /></swiper-slide>
                </swiper-container>
            </div>
        </main>
    )
}