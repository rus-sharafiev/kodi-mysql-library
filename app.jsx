import './CSS/main.css';
import './CSS/mobile.css';
import './CSS/styles.css';

import React, { useState, useEffect, useTransition } from 'react';
import ReactDOM from 'react-dom/client';

const LoadImage = (props) => {

    const proxyImage = (url) => {
        if (!url) return;
        let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        return(googleProxyURL + encodeURIComponent(url));
    }

    return (
        <img 
            src={proxyImage(props.src)} 
            className={props.cls} 
            alt={props.cls}
            onLoad={() => {props.load(true)}}
        />
    )
}

const Card = (props) => {
    const [fanartLoaded, setFanartLoaded] = useState(false);
    const [posterLoaded, setPosterLoaded] = useState(false);

    const ratingColor = (rating) => {
        if (!rating) return;
        let background;
        switch (true) {
            case (rating < 5): background =  "linear-gradient(160deg, rgba(220, 20, 60, 0) 80%, rgb(220, 20, 60) 100%)"; break;
            case (rating < 6): background = "linear-gradient(160deg, rgba(255, 0, 0, 0) 80%, rgb(255, 0, 0) 100%)"; break;
            case (rating < 6.5): background = "linear-gradient(160deg, rgba(255, 165, 0, 0) 80%, rgb(255, 165, 0) 100%)"; break;
            case (rating < 7): background = "linear-gradient(160deg, rgba(255, 215, 0, 0) 80%, rgb(255, 215, 0) 100%)"; break;
            case (rating < 8): background = "linear-gradient(160deg, rgba(154, 205, 50, 0) 80%, rgb(154, 205, 50) 100%)"; break;
            case (rating < 9): background = "linear-gradient(160deg, rgba(50, 205, 50, 0) 80%, rgb(50, 205, 50) 100%)"; break;
            case (rating < 10): background = "linear-gradient(160deg, rgba(0, 255, 0, 0) 80%, rgb(0, 255, 0) 100%)"; break;
            case (rating >= 10): background = "linear-gradient(160deg, rgba(0, 255, 0, 0) 80%, rgb(0, 255, 0) 100%)"; break;
        }
        return background;
    }

    return (     
        <div className='tile' style={(fanartLoaded && posterLoaded) ? {} : { opacity: '0' }}>
            <LoadImage src={props.data.fanart} cls='fanart' load={setFanartLoaded} />
            <LoadImage src={props.data.poster} cls='poster' load={setPosterLoaded} />
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
            {props.data.rating && <div className='rating' style={{backgroundImage: ratingColor(props.data.rating)}}>{props.data.rating.toFixed(1)}</div>}
        </div>
    )
}

const Content = (props) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetch(`db.php?type=${props.type}`)
            .then((response) => response.json())
            .then((data) => setContent(data));        
    }, [props.type]);

    const loadCards = () => {
            if (content.length != 0) return content.map(data => <Card key={data.id} data={data} />)
    }

    return (
        loadCards()   
    )
}

const LoadingAnimation = (props) => {
    console.log(props.show)
    return (
        props.show ? <img src='IMG/cpi.svg' className='loading' alt='loading'></img> : null
    )
}

const NavButton = (props) => {
    const [isPending, startTransition] = useTransition();

    const isActive = (id) => {
        return id == props.active ? 'nav-active' : ''
    }

    const handleClick = () => {
        startTransition(() => {
            props.type(props.id)
        })
    }
    
    return (
        
        <div id={props.id} className={isActive(props.id)} onClick={ handleClick }>
            <span className='material-symbols-rounded'>{props.symbol}</span>
            {props.name}
        </div>
    )
}

const App = () => {
    const [activePage, setActivePage] = useState('movies');

    return ( 
        <>            
            <header>
                <img src='/IMG/kodi-logo-with-text.svg' className='logo' alt='logo'></img>
                <span className='title-in-header'>Домашняя библиотека фильмов и сериалов</span>
            </header>
            <main>
                <Content type={activePage} />
            </main>      
            <nav>
                <NavButton id='movies' symbol='Movie' name='Фильмы' active={activePage} type={setActivePage} />
                <NavButton id='tvs' symbol='Videocam' name='Сериалы' active={activePage} type={setActivePage} />
            </nav>
        </>
    );
}

ReactDOM.createRoot(document.body).render(<App />);