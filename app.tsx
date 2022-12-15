declare global {
    interface Navigator {
        windowControlsOverlay: any;
    }
}

import './CSS/main.css';
import './CSS/mobile.css';
import './CSS/styles.css';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation } from "react-router-dom";
import { CircularProgressIndicator}  from './cpi.jsx';
import { Logo } from './logo.jsx';
import { Workbox } from 'workbox-window';

// if ('serviceWorker' in navigator) {
//     const wb = new Workbox('/sw.js');
//     wb.register();
// }

// Listen when icons will be loaded
const iconsLoaded = (event: any) => {
    event.fontfaces.map( (font: any) => {
        if (font.family == 'Material Symbols Rounded') {
            document.getElementById("root")?.classList.remove('icons-hidden');
        }
    })
}
document.fonts.addEventListener("loadingdone", iconsLoaded);

// Chech if mobile
var mobile: boolean = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
}
if (mobile) {
    var prevScrollPosition = window.scrollY;
    const headerHide = () => {
        var currentScrollPosition = window.scrollY;
        if (prevScrollPosition < currentScrollPosition) { // scroll down
            if (window.scrollY > 100 && !document.body.classList.contains('scroll-down')) {
                document.body.classList.add('scroll-down');
            }
        }
        if (prevScrollPosition > currentScrollPosition) { // scroll up
            if (document.body.classList.contains('scroll-down')) {
                document.body.classList.remove('scroll-down');
            }
        }
        prevScrollPosition = currentScrollPosition;
    }
    window.addEventListener('scroll', headerHide, false);
}

// App


const Rating = (props) => {

    let color = (props.rating - 5.5) * 35;
    let x = props.width ? props.width / 2 : 25;
    let y = props.height ? props.height / 2 : 25;
    let r = props.r ? props.r : 18;
    let k = (props.rating) / 10;
    // 00 54 20
    // 00 84 47
    console.log(props.rating);

    return(
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={props.width ? props.width : 50} 
            height={props.height ? props.height : 50}
            >
            <circle 
                stroke='green' 
                fill='none' 
                strokeWidth={props.strokeWidth ? props.strokeWidth : 4} 
                cx={x}
                cy={y}
                r={r}
                transform={`rotate(-90 ${x} ${y})`}
                strokeDasharray={`${(2 * Math.PI * r)} ${(2 * Math.PI * r)}`}
                strokeDashoffset={(2 * Math.PI * r) - (2 * Math.PI * r * k)}
            />
        </svg>
    )
}

const Card = (props: { data: { [index: string]: any } }) => {

    let bgrdClr = (rating: number) => {
        let color = (rating - 5.5) * 35;
        let l: string;

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            l = '45%';
        } else { l = '20%' }

        if (color < 0 ) {
            return `linear-gradient(0, hsl(0 100% ${l} / 20%), hsl(0 100% ${l} / 20%)), var(--md-sys-color-surface)`
        } else if (color > 120) {
            return `linear-gradient(0, hsl(120 100% ${l} / 20%), hsl(120 100% ${l} / 20%)), var(--md-sys-color-surface)`
        } else {
            return `linear-gradient(0, hsl(${color} 100% ${l} / 20%), hsl(${color} 100% ${l} / 20%)), var(--md-sys-color-surface)`
        }
    }

    return (     
        <div className='card' style={{ background: bgrdClr(props.data.rating) }}>
            {!mobile && <img className='card-fanart' src={props.data.fanart} alt='fanart' />}
            <img className='card-poster' src={props.data.poster} alt='poster' />
            <div className='card-title'>{props.data.title}</div>
            <div className='card-original-title'>{props.data.original_title}</div>
            <div className='card-genre'>{props.data.genre}</div>
            <div className='card-subtitle'>{props.data.subtitle}</div>
            <div className='card-studio'>Студия: {props.data.studio}</div>
            <div className='card-premiered-date'>Дата премьеры: {props.data.premiered_date}</div>
            <div className='card-director'>{ props.data.director ? 'Режисер:' : null } {props.data.director}</div>
            <div className='card-writer'>{ props.data.writer && 'Автор сценария:' } {props.data.writer}</div>
            <div className='card-review'>{props.data.review}</div>
            <a className='card-youtube ' href={props.data.youtube} target="_blank" rel="noopener noreferrer">
                <img src='IMG/youtube.svg' /><span>You</span><span>Tube</span>
            </a>
            <div className='card-pg-rating'>{props.data.pg_rating}</div>
            { props.data.rating && <div className='card-rating' ><span>Рейтинг TMDB </span>{props.data.rating.toFixed(1)}</div> }
            {/* { props.data.rating && <div className='card-rating' >< Rating rating={props.data.rating.toFixed(1)} /></div> } */}
        </div>
    )
}

const Content = (props: { sort: string, order: string }) => {
    let { type } = useParams();
    const [contentType, setContentType] = useState(type);
    const [content, setContent] = useState<{ [index: string]: any }>([]);
    const [loaded, setLoaded] = useState(false);
    let location = useLocation();

    useEffect(() => {
        setContentType(type)
    }, [location]);

    useEffect(() => {
        fetch(`db.php?type=${contentType}`)
            .then((response) => response.json())
            .then((unsortedArray) => sort(unsortedArray))
            .then((sortedArray) => preloadArray(sortedArray))
            .then((preloadedArray) => setContent(preloadedArray))
            .finally(() => setLoaded(true));
    }, [contentType, props.sort, props.order, loaded]);

    useEffect(() => {
        if (loaded) setLoaded(false);
    }, [contentType]);

    const proxyImage = (url: string): string => {
        if (url) {
            let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
            return(googleProxyURL + encodeURIComponent(url));
        } else return ''
    }

    const imageLoader = async (url: string) => {
        return new Promise((res) => {
            let img = new Image();
            img.src = proxyImage(url);
            img.onload = () => {
                res(img.src)
            }
        });
    }

    const preloadArray = async (content: {[index: string]: any}) => {
        let array = await Promise.all( content.map( async (item: {[index: string]: any}) => {
            item.poster = await imageLoader(item.poster);
            item.fanart = await imageLoader(item.fanart);
            return item;
        }));
        return array;
    } 

    const sort = async (content: any) => {
        let fist: string;
        let second: string;
        let array = content.slice();
        array.sort( (a: any, b: any) => {
            switch (props.sort) {
                case 'rating':            
                    fist = a.rating;
                    second = b.rating;
                    break;
                case 'title':            
                    fist = a.title;
                    second = b.title;
                    break;
                case 'premiered':            
                    fist = a.premiered_date;
                    second = b.premiered_date;
                    break;
            }    
            switch (props.order) {
                case 'asc':
                    if (fist < second) { return -1; }
                    if (fist > second) { return 1; }
                    break;
                case 'desc':
                    if (fist < second) { return 1; }
                    if (fist > second) { return -1; }
                    break;
            }
            return 0;
        });
        return array;
    }

    return (
        <>  
            { !loaded && <CircularProgressIndicator timeout={500} className='cpi' /> }
            { content.length != 0
                ? content.map( (data: {[index: string]: any}) => <Card key={data.id} data={data}/>) 
                : <div className='start-loading-text'> Загрузка приложения... </div> }
        </>        
    )
}

let SortBtn = (props: { arr: any, id: (id: string) => void }) => {
    const [count, setCount] = useState(0);
    let type = props.arr[count];

    useEffect(() => {
        props.id(type.id);
    }, [count]);

    return (
        <div 
            id={type.id}
            onClick={ () => { count < props.arr.length - 1 ? setCount(count + 1) : setCount(0); }}
            >
            <span className='material-symbols-rounded' style={ type.style ? type.style : null }>{type.value}</span>
            { type.text }
        </div>
    )
}

const Sort = (props: {sort: (sort: string) => void, order: (order: string) => void}) => {
    const [sort, setSort] = useState('premiered');
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        props.sort(sort);
    }, [sort]);

    useEffect(() => {
        props.order(order);
    }, [order]);

    let sortButtons = [        
        {
            id: 'premiered',
            value: 'calendar_month',
            text: 'по выходу в прокат'
        },
        {
            id: 'rating',
            value: 'trending_up',
            text: 'по рейтингу'
        },
        {
            id: 'title',
            value: 'sort_by_alpha',
            text: 'по названию'
        }
    ];

    let orderButtons = [
        {
            id: 'desc',
            value: 'sort',
            text: 'по убыванию',
            style: {transform: 'scale(1, 1)'}
        },
        {
            id: 'asc',
            value: 'sort',
            text: 'по возрастанию',
            style: {transform: 'scale(1, -1)'}
        }
    ];

    return (
        <div className='sort'>
            <SortBtn arr={sortButtons} id={setSort} />
            <SortBtn arr={orderButtons} id={setOrder} />
        </div>
    )
}

const NavButton = (props: { id: string, symbol: string, name: string }) => {

    return (
        <NavLink to={`/${props.id}`} className={ ({ isActive }) => isActive ? 'nav-active' : undefined }>
            <span className='material-symbols-rounded'>{props.symbol}</span>
            {props.name}
        </NavLink> 
    )
}

const App = () => {
    window.location.pathname === '/' ? window.location.pathname = '/movies' : null;
    const [sortContent, setSortContent] = useState('premiered');
    const [orderContent, setOrderContent] = useState('desc');

    const [windowCtlOvrlVisible, setWindowCtlOvrlVisible] = useState(!mobile ? navigator.windowControlsOverlay.visible : false);
    if (!mobile && ('windowControlsOverlay' in navigator)) {
        navigator.windowControlsOverlay.addEventListener('geometrychange', (event: any) => {
            if (event.visible) {
                setWindowCtlOvrlVisible(true)
            } else {setWindowCtlOvrlVisible(false)}
        });
    }

    return ( 
        <>            
            <main>
                <Routes>
                    <Route path="/:type" element={ <Content sort={sortContent} order={orderContent}/> }/>
                </Routes>
            </main>
            {windowCtlOvrlVisible && <div id='pseudo-title-bar'>Домашняя библиотека фильмов и сериалов медиацентра KODI</div>}
            <nav>                
                <Logo mobile={mobile} />
                <NavButton id='movies' symbol='Movie' name='Фильмы' />
                <NavButton id='tvs' symbol='Videocam' name='Сериалы' />
            </nav>
            {!mobile && <a href='https://github.com/rus-sharafiev/kodiMysqlLibrary' className='git-hub' target="_blank" rel="noopener noreferrer">
                <img src='IMG/gh.svg' alt='GitHub Logo'/></a>}
            <Sort sort={setSortContent} order={setOrderContent}/>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<BrowserRouter><App /></BrowserRouter>);