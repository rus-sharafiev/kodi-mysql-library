import './CSS/main.css';
import './CSS/mobile.css';
import './CSS/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

class NavButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} onClick={() => console.log(this.props.id)}>
                <span className='material-symbols-rounded'>{this.props.symbol}</span>
                {this.props.name}
            </div>
        )
    }
}

class LoadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src
        };
    }

    proxyImage(url) {
        if (!url) return;
        let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        return(googleProxyURL + encodeURIComponent(url));
    }

    loadArt(url) {
        if (!url) return;
        let proxyUrl = this.proxyImage(url);
        return new Promise( (res) => {
            let img = new Image();
            img.src = proxyUrl;
            img.onload = () => {
                res(img.src);
            }
        })
    }

    render() {
        return (
            <img src={this.proxyImage(this.props.src)} className={this.props.cls} alt={this.props.cls}></img>
        )
    }
}

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    ratingColor(rating) {
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

    render() {
        return (            
            <div className='tile'>
                <LoadImage src={this.props.data.fanart} cls='fanart' />
                <LoadImage src={this.props.data.poster} cls='poster' />
                <div className='title'>{this.props.data.title}</div>
                <div className='subtitle'>{this.props.data.subtitle}</div>
                <div className='review'>{this.props.data.review}</div>
                <div className='writer'>{this.props.data.writer}</div>
                <div className='pg-rating'>{this.props.data.pg_rating}</div>
                <div className='genre'>{this.props.data.genre}</div>
                <div className='director'>{this.props.data.director}</div>
                <div className='original-title'>{this.props.data.original_title}</div>
                <div className='studio'>{this.props.data.studio}</div>
                <div className='premiered-date'>{this.props.data.premiered_date}</div>
                {this.props.data.rating && <div className='rating' style={{backgroundImage: this.ratingColor(this.props.data.rating)}}>{this.props.data.rating.toFixed(1)}</div>}
            </div>
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            content: []
        };
    }

    componentDidMount() {
        fetch(`db.php?type=${this.props.type}`)
            .then((response) => response.json())
            .then((data) => this.setState({ content: data }))
            .catch((error) => console.log(error))
    }

    render() {
        return (
            Object.entries(this.state.content).map(([id, data]) => <Tile key={id} data={data} />)
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <>            
                <header>
                    <img src='/IMG/kodi-logo-with-text.svg' className='logo' alt='logo'></img>
                    <span className='title-in-header'>Домашняя библиотека фильмов и сериалов</span>
                </header>
                <main>
                    <div id='main-top'></div>
                    <div id='main-container'>
                        <Main type='tvs' />
                        <div className='gradient-top'></div>
                        <div className='gradient-bottom'></div>
                    </div>
                </main>
                <nav>
                    <NavButton id='movies' symbol='Movie' name='Фильмы' />
                    <NavButton id='tvs' symbol='Videocam' name='Сериалы' />
                </nav>
            </>
        );
    }
}

ReactDOM.createRoot(document.body).render(<App />);