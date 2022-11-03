import './CSS/main.css';
import './CSS/mobile.css';
import './CSS/styles.css';

import React, { useState, useEffect } from 'react';
import CircularProgressIndicator from './cpi.jsx';
import ReactDOM from 'react-dom/client';
// import {Workbox} from 'workbox-window';

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
        <div className='card' style={{borderColor: `rgba(${ratingColor(props.data.rating)})`}}>
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
            {props.data.rating && 
                <div className='rating' 
                    style={{ backgroundImage: `linear-gradient(160deg, rgba(${ratingColor(props.data.rating)}, 0) 80%, rgb(${ratingColor(props.data.rating)}, 100%)` }}
                    >
                    {props.data.rating.toFixed(1)}
                </div>}
        </div>
    )
}

const Content = (props) => {
    const [content, setContent] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`db.php?type=${props.type}`)
            .then((response) => response.json())
            .then((unsortedArray) => sort(unsortedArray))
            .then((sortedArray) => preloadArray(sortedArray))
            .then((preloadedArray) => setContent(preloadedArray))
            .finally(() => setLoaded(true));
    }, [props.type, props.sort, props.order, loaded]);

    useEffect(() => {
        if (loaded) setLoaded(false);
    }, [props.type]);

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

    const loadStartAnimation = (n) => {
        for (let i = 0; i < n; i++) { 
            <div className='start-loading'></div>
        }
    }

    return (
        <>
            { !loaded && <CircularProgressIndicator container='loading' timeout='500' /> }
            {  content.length != 0 
                ? content.map(data => <Card key={data.id} data={data}/>) 
                : <div className='start-loading-text'> Загрузка приложения... </div> }
        </>        
    )
}

const NavButton = (props) => {
    const [fontsLoaded, SetFontsLoaded] = useState(false);

    useEffect(() => {
        document.fonts.load("24px Material Symbols Rounded").then(() => SetFontsLoaded(true));
    }, [fontsLoaded]);

    const isActive = (id) => {
        return id == props.active ? 'nav-active' : ''
    }

    const handleClick = () => {
        props.type(props.id)
    }
    
    return (        
        <div id={props.id} className={isActive(props.id)} onClick={ handleClick }>
            <span className='material-symbols-rounded'>{ fontsLoaded ? props.symbol : null }</span>
            {props.name}
        </div>        
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

const App = () => {
    const [activePage, setActivePage] = useState('movies');
    const [sortContent, setSortContent] = useState('rating');
    const [orderContent, setOrderContent] = useState('desc');

    return ( 
        <>            
            <header>
                <img src='IMG/logo.svg' className='logo' alt='logo'></img>
                <span className='title-in-header'>KODI HOME MEDIA LIBRARY</span>
            </header>
            <main>
                <Content type={activePage} sort={sortContent} order={orderContent}/>
            </main>      
            <nav>
                <NavButton id='movies' symbol='Movie' name='Фильмы' active={activePage} type={setActivePage} />
                <NavButton id='tvs' symbol='Videocam' name='Сериалы' active={activePage} type={setActivePage} />
                <Sort sort={setSortContent} order={setOrderContent}/>
            </nav>
        </>
    );
}

ReactDOM.createRoot(document.querySelector('root')).render(<App />);