import './CSS/main.css';
import './CSS/mobile.css';
import './CSS/styles.css';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation } from "react-router-dom";
import CircularProgressIndicator from './cpi.jsx';
import {Workbox} from 'workbox-window';

// if ('serviceWorker' in navigator) {
//     const wb = new Workbox('/sw.js');
//     wb.register();
// }

const Card = (props) => {

    const ratingColor = (rating) => {
        if (!rating) return;
        let color;
        switch (true) {
            case (rating < 5): color =  '220, 20, 60, 0'; break;
            case (rating < 6): color = '255, 0, 0, 0'; break;
            case (rating < 6.5): color = '255, 165, 0'; break;
            case (rating < 7): color = '255, 215, 0'; break;
            case (rating < 8): color = '154, 205, 50'; break;
            case (rating < 9): color = '50, 205, 50'; break;
            case (rating < 10): color = '0, 255, 0'; break;
            case (rating >= 10): color = '0, 255, 0'; break;
        }
        return color;
    }

    return (     
        <div className='card' style={{borderColor: `rgba(${ratingColor(props.data.rating)}, 0.8)`}}>
            <img className='fanart' src={props.data.fanart} alt='fanart' />
            <img className='poster' src={props.data.poster} alt='poster' />
            <div className='title'>{props.data.title}</div>
            <div className='subtitle'>{props.data.subtitle}</div>
            <div className='review'>{props.data.review}</div>
            <div className='writer'>{props.data.writer}</div>
            <div className='pg-rating'>{props.data.pg_rating}</div>
            <div className='genre'>{props.data.genre}</div>
            <div className='director'>{props.data.director}</div>
            <div className='original-title'>{props.data.original_title}</div>
            <div className='studio'>{props.data.studio}</div>
            <div className='premiered-date'>{props.data.premiered_date}</div>
            <a className='youtube ' href={props.data.youtube} target="_blank" rel="noopener noreferrer">
                <img src='IMG/yt.svg' />
            </a>
            {props.data.rating && 
                <div className='rating' 
                    style={{ backgroundImage: `linear-gradient(160deg, rgba(${ratingColor(props.data.rating)}, 0) 80%, rgba(${ratingColor(props.data.rating)}, 0.8)` }}
                    >
                    {props.data.rating.toFixed(1)}
                </div>}
        </div>
    )
}

const Content = (props) => {
    let { type } = useParams();
    const [contentType, setContentType] = useState(type);
    const [content, setContent] = useState([]);
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

    const proxyImage = (url) => {
        if (!url) return;
        let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        return(googleProxyURL + encodeURIComponent(url));
    }

    const imageLoader = async (url) => {
        return new Promise((res) => {
            let img = new Image();
            img.src = proxyImage(url);
            img.onload = () => {
                res(img.src)
            }
        });
    }

    const preloadArray = async (content) => {
        let array = await Promise.all( content.map( async (item) => {
            item.poster = await imageLoader(item.poster);
            item.fanart = await imageLoader(item.fanart);
            return item;
        }));
        return array;
    } 

    const sort = async (content) => {
        let array = content.slice();
        array.sort( (a, b) => {
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
            { !loaded && <CircularProgressIndicator container='loading' timeout='500' /> }
            { content.length != 0 
                ? content.map(data => <Card key={data.id} data={data}/>) 
                : <div className='start-loading-text'> Загрузка приложения... </div> }
        </>        
    )
}

let SortBtn = (props) => {
    const [count, setCount] = useState(0);
    const [fontsLoaded, SetFontsLoaded] = useState(false);
    let type = props.arr[count];

    useEffect(() => {
        props.id(type.id);
    }, [count]);
    
    useEffect(() => {
        document.fonts.load("24px Material Symbols Rounded").then(() => SetFontsLoaded(true));
    }, [fontsLoaded]);

    return (
        <div 
            id={type.id} 
            onClick={ () => { count < props.arr.length - 1 ? setCount(count + 1) : setCount(0); }}
            >
            <span className='material-symbols-rounded' style={type.style ? type.style : null} >{ fontsLoaded ? type.value : null }</span>
            { type.text }
        </div>
    )
}

const Sort = (props) => {
    const [sort, setSort] = useState('rating');
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

const NavButton = (props) => {
    const [fontsLoaded, SetFontsLoaded] = useState(false);

    useEffect(() => {
        document.fonts.load("24px Material Symbols Rounded").then(() => SetFontsLoaded(true));
    }, [fontsLoaded]);

    return (
        <NavLink to={`/${props.id}`} className={ ({ isActive }) => isActive ? 'nav-active' : null }>
            <span className='material-symbols-rounded'>{ fontsLoaded ? props.symbol : null }</span>
            {props.name}
        </NavLink> 
    )
}

const App = () => {
    window.location.pathname === '/' ? window.location.pathname = '/movies' : null;
    const [sortContent, setSortContent] = useState('premiered');
    const [orderContent, setOrderContent] = useState('desc');

    return ( 
        <>      
            <header>
                <img src='IMG/logo.svg' className='logo' alt='logo'></img>
                <span className='title-in-header'>KODI<span>HOME MEDIA LIBRARY</span></span>
            </header>
            <main>
                <Routes>
                    <Route path="/:type" element={ <Content sort={sortContent} order={orderContent}/> }/>
                </Routes>
            </main>
            <nav>
                <NavButton id='movies' symbol='Movie' name='Фильмы' />
                <NavButton id='tvs' symbol='Videocam' name='Сериалы' />
            </nav>
            <Sort sort={setSortContent} order={setOrderContent}/>
        </>
    );
}

ReactDOM.createRoot(document.querySelector('root')).render(<BrowserRouter><App /></BrowserRouter>);