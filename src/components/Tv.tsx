import { useEffect, useState } from "react"
import { Tv as ITv } from "../@types/tv"
import proxyImage from "../utils/proxyImage"
import Rating from "./Rating"

// --------------------------------------------------------------------------------

interface MovieProps {
    data: ITv
}

export const Tv: React.FC<MovieProps> = ({ data: tv }) => {
    const [showYt, setShowYt] = useState(false)

    useEffect(() => {
        setShowYt(false)
        setTimeout(() => setShowYt(true), 300)
    }, [tv])

    return (
        <div className="tv" key={`movie-id-${tv.id}`}>

            <div className="poster" >
                <md-elevation></md-elevation>
                <img src={proxyImage(tv.art.poster.replace('original', 'w500'))} />
            </div>
            <div className="rating-container"><span>Рейтинг</span>Голосов {tv.votes}<Rating rating={tv.rating} /></div>
            <div className="title">{tv.title}</div>
            <div className="original-title">{tv.originalTitle}</div>
            {/* <div className="subtitle">{tv.subtitle}</div> */}
            {/* <div className="duration"><span>Длительность</span>{tv.duration.toHHMMSS()}</div> */}
            <div className="genre"><span>Жанр</span>{tv.genre}</div>
            <div className="premiered"><span>Дата премьеры</span>{new Date(tv.premiered).toLocaleString('ru', { dateStyle: 'long' })}</div>
            <div className="studio"><span>Студия</span>{tv.studio}</div>
            {/* <div className="country"><span>Страна</span>{tv.country}</div> */}
            <div className="youtube">
                <md-elevation />
                {showYt && <iframe
                    src={`https://www.youtube-nocookie.com/embed/${tv.youtube.split('=').pop()}?controls=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                </iframe>}
            </div>

            <div className="desc"><span>Обзор</span>{tv.description}</div>

            <div className="seasons-container">
                <span>Сезоны</span>
                <div className="seasons">
                    {tv.seasons && tv.seasons.map(season =>
                        <div className="card" key={`tv-${season.idSeason}`}>
                            <div className="poster">
                                <md-ripple></md-ripple>
                                <md-elevation></md-elevation>
                                <img src={proxyImage(season.art.poster
                                    ? season.art.poster.replace('original', 'w300')
                                    : tv.art.poster.replace('original', 'w300')
                                )} />
                            </div>
                            <div className="desc">
                                <div className="title body-small">{season.name}</div>
                                {/* <Rating rating={season.userrating} /> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Tv