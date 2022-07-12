// Service worker
import {Workbox} from 'workbox-window';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');
    wb.register();
}


// Main DOM
const header = document.createElement('header');
const nav = document.createElement('nav');
const main = document.createElement('main');
    const mainTop = document.createElement('div'); mainTop.setAttribute('id','main-top');
    const mainContainer = document.createElement('div'); mainContainer.setAttribute('id','main-container');
        const gradientLayerTop = document.createElement('div'); gradientLayerTop.setAttribute('class','gradient-top');
        const gradientLayerBottom = document.createElement('div'); gradientLayerBottom.setAttribute('class','gradient-bottom');
    main.append(mainTop, mainContainer);
const footer = document.createElement('footer');

document.body.onload = () => {
    document.body.append(header, nav, main, footer);    
    loadPage();
}


// Header
const createHeader = async () => {
    let logo = loadImg('/IMG/kodi-logo-with-text.svg', 'logo');
    let titleInHeader = loadTxt('Домашняя библиотека фильмов и сериалов', 'span', 'title-in-header');
    let mobile = sortOnMobile();
    let sort = sortBy();

    return Promise.all([logo, titleInHeader, mobile, sort]);
}

const sortOnMobile = async () => {    
    let btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'sort';
    btn.setAttribute('class', 'mobile-sort material-symbols-rounded');
    btn.onclick = () => {
        if (document.querySelector('.sort').offsetHeight == 0) {
            document.querySelector('.sort').style.height = "50px";
            document.querySelector('.sort').setAttribute('class', 'sort sort-shadow');
            btn.value = 'close';
        } else {
            document.querySelector('.sort').style.height = "0";
            document.querySelector('.sort').setAttribute('class', 'sort');
            btn.value = 'sort';
        }
    }

    return btn;
}

const sortBy = async () => {
    let container = document.createElement('div');
    container.setAttribute('class', 'sort');

    let sortBtnCont = document.createElement('div');
    sortBtnCont.setAttribute('class', 'sort-button-container');
    let sortBtnText = document.createElement('span');
    sortBtnText.innerHTML = 'по названию';

    let sortBtn = document.createElement('input');
    sortBtn.type = 'button';
    sortBtn.value = 'sort_by_alpha';
    sortBtn.id = 'title';
    sortBtn.setAttribute('class', 'sort-button material-symbols-rounded');
    sortBtnCont.onclick = () => {
        switch (sortBtn.id) {
            case "title":
                sortBtn.id = "rating";
                sortBtn.value = "thumbs_up_down";
                sortBtnText.innerHTML = 'по рейтингу';
                loadMain(document.querySelector('.nav-active').id);
                break;
            case "rating":
                sortBtn.id = "premiered";
                sortBtn.value = "calendar_month";
                sortBtnText.innerHTML = 'по выходу в прокат';
                loadMain(document.querySelector('.nav-active').id);
                break;
            case "premiered":
                sortBtn.id = "title";
                sortBtn.value = "sort_by_alpha";
                sortBtnText.innerHTML = 'по названию';
                loadMain(document.querySelector('.nav-active').id);
                break;
        }
    }
    sortBtnCont.append(sortBtn, sortBtnText);

    let orderBtnCont = document.createElement('div');
    orderBtnCont.setAttribute('class', 'order-button-container');
    let orderBtnText = document.createElement('span');
    orderBtnText.innerHTML = 'по возрастанию';

    let orderBtn = document.createElement('input');
    orderBtn.type = 'button';
    orderBtn.value = 'Sort';
    orderBtn.id = 'asc';
    orderBtn.style = 'transform: scale(1, -1);';
    orderBtn.setAttribute('class', 'order-button material-symbols-rounded');
    orderBtnCont.onclick = () => {
        switch (orderBtn.id) {
            case "asc":
                orderBtn.id = "desc";
                orderBtn.style = 'transform: scale(1, 1);';
                orderBtnText.innerHTML = 'по убыванию';
                loadMain(document.querySelector('.nav-active').id);
                break;
            case "desc":
                orderBtn.id = "asc";
                orderBtn.style = 'transform: scale(1, -1);';
                orderBtnText.innerHTML = 'по возрастанию';
                loadMain(document.querySelector('.nav-active').id);
                break;
        }
    }
    orderBtnCont.append(orderBtn, orderBtnText);

    container.append(sortBtnCont, orderBtnCont);
    await document.fonts.load("24px Material Symbols Rounded");

    return container;
}

// Nav 
const navButton = async (txt, symb, cls) => {
    let btn = document.createElement('div');
    let title = document.createTextNode(txt);
    let icon = document.createElement('span');
    let symbol = document.createTextNode(symb);
    icon.setAttribute('class', 'material-symbols-rounded');
    icon.appendChild(symbol);
    btn.setAttribute('id', cls);
    btn.append(icon, title);
    btn.onclick = () => loadMain(cls);
    await document.fonts.load("24px Material Symbols Rounded");

    return btn; // Promise
}
const createNav = async () => {
    let movies = navButton('Фильмы', 'Movie', 'movies');
    let tvs = navButton('Сериалы', 'Videocam', 'tvs');

    return Promise.all([movies, tvs]);  // Promise
}

// Load content
const loadImg = async (url, cls) => {
    let img = new Image();
    img.src = url;
    img.setAttribute('class', cls);

    return img; // Promise
};
const loadTxt = async (text, tag, cls) => {
    if (text) {
        let cont = document.createElement(tag);
        let txt = document.createTextNode(text);
        cont.appendChild(txt);
        cont.setAttribute('class', cls);
        
        return cont; // Promise
    }
}
const loadLink = async (src, imgWidth, url, cls) => {
    let link = document.createElement('a');
    let logo = new Image(imgWidth);
    logo.src = src;
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('class', cls);
    link.appendChild(logo);
        
    return link; // Promise
}
const loadArt = async (arts, id, type) => {
    let Url = arts[id][type];

    return new Promise( (res) => {
        let img = new Image();
        img.src = Url;
        img.setAttribute('class', type);
        img.onload = () => {
            res(img); // Promise
        }
    })
}
const loadRating = async (ratings, id) => {
    let rating = ratings[id]['rating'];

    let cont = document.createElement('div');
    let txt = document.createTextNode(rating.toFixed(1));
    cont.appendChild(txt);
    cont.setAttribute('class', 'rating');    
    
    switch (true) {
        case (rating < 5): cont.style.backgroundImage = "linear-gradient(160deg, rgba(220, 20, 60, 0) 80%, rgb(220, 20, 60) 100%)"; break;
        case (rating < 6): cont.style.backgroundImage = "linear-gradient(160deg, rgba(255, 0, 0, 0) 80%, rgb(255, 0, 0) 100%)"; break;
        case (rating < 6.5): cont.style.backgroundImage = "linear-gradient(160deg, rgba(255, 165, 0, 0) 80%, rgb(255, 165, 0) 100%)"; break;
        case (rating < 7): cont.style.backgroundImage = "linear-gradient(160deg, rgba(255, 215, 0, 0) 80%, rgb(255, 215, 0) 100%)"; break;
        case (rating < 8): cont.style.backgroundImage = "linear-gradient(160deg, rgba(154, 205, 50, 0) 80%, rgb(154, 205, 50) 100%)"; break;
        case (rating < 9): cont.style.backgroundImage = "linear-gradient(160deg, rgba(50, 205, 50, 0) 80%, rgb(50, 205, 50) 100%)"; break;
        case (rating < 10): cont.style.backgroundImage = "linear-gradient(160deg, rgba(0, 255, 0, 0) 80%, rgb(0, 255, 0) 100%)"; break;
        case (rating >= 10): cont.style.backgroundImage = "linear-gradient(160deg, rgba(0, 255, 0, 0) 80%, rgb(0, 255, 0) 100%)"; break;
    }

    return cont; // Promise
}

const tileContent = async (arts, ratings, movie) => {
    let poster = loadArt(arts, movie.id, 'poster');
    let fanart = loadArt(arts, movie.id, 'fanart');
    let title = loadTxt(movie.title, 'div', 'title');
    let subtitle = loadTxt(movie.subtitle, 'div', 'subtitle');
    let review = loadTxt(movie.review, 'div', 'review');
    let writer = loadTxt(movie.writer, 'div', 'writer');
    let pg_rating = loadTxt(movie.pg_rating, 'div', 'pg-rating');
    let genre = loadTxt(movie.genre, 'div', 'genre');
    let director = loadTxt(movie.director, 'div', 'director');
    let original_title = loadTxt(movie.original_title, 'div', 'original-title');
    let studio = loadTxt(movie.studio, 'div', 'studio');
    let youtube = loadLink('/IMG/yt.svg', 80, movie.youtube, 'youtube');
    let premiered_date = loadTxt(movie.premiered_date, 'div', 'premiered-date');
    let rating = loadRating(ratings, movie.id);

    let content = await Promise.all([poster, fanart, title, subtitle, review, writer, pg_rating, genre, director, original_title, studio, youtube, premiered_date, rating]);
    
    return content; // Promise
}

// Fetch MySQL
const fetchData = async (db) => {
    let response = await fetch(db);
    let movies = await response.json();
    
    let artsResponse = await fetch('art.php');
    let arts = await artsResponse.json();

    let ratingsResponse = await fetch('rating.php');
    let ratings = await ratingsResponse.json();

    let content = Promise.all(movies.map( async (movie) => {
        let tile = document.createElement('div'); 
        tile.setAttribute('class','tile');

        let cont = await tileContent(arts, ratings, movie);
        cont.map((el) => { if (el) tile.append(el) } );

        return tile;
    }));

    return content;
}

// Load page

const sort = (content, btn, type, order) => {
    content.sort( (a, b) => {            
        if (btn == 'movies') {  
            switch (type) {
                case 'rating':            
                    fist = a.children[13].innerText.toUpperCase();
                    second = b.children[13].innerText.toUpperCase();
                    break;
                case 'title':            
                    fist = a.children[2].innerText.toUpperCase();
                    second = b.children[2].innerText.toUpperCase();
                    break;
                case 'premiered':            
                    fist = a.children[12].innerText.toUpperCase();
                    second = b.children[12].innerText.toUpperCase();
                    break;
            }
        } else {  
            switch (type) {
                case 'rating':            
                    fist = a.children[9].innerText.toUpperCase();
                    second = b.children[9].innerText.toUpperCase();
                    break;
                case 'title':            
                    fist = a.children[2].innerText.toUpperCase();
                    second = b.children[2].innerText.toUpperCase();
                    break;
                case 'premiered':            
                    fist = a.children[8].innerText.toUpperCase();
                    second = b.children[8].innerText.toUpperCase();
                    break;
            }
        }

        switch (order) {
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
}

const loadMain = async (btn) => {
    mainContainer.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    switch (btn) {
        case 'movies':
            db = 'mdb.php';
            break;
        case 'tvs':
            db = 'tdb.php';
            break;
    }
    let content = await fetchData(db);
    let sortType = document.querySelector('.sort-button').id;
    let sortOrder = document.querySelector('.order-button').id;

    sort(content, btn, sortType, sortOrder);
    mainContainer.innerHTML = '';
    mainContainer.append(gradientLayerTop, gradientLayerBottom);
    content.map((tile) => mainContainer.append(tile));

    let active = document.getElementsByClassName('nav-active');
    if (active.length > 0) {
        for (let i = 0; i < active.length; i++) {
            active[i].classList.remove('nav-active');   
        };
    }
    document.getElementById(btn).classList.add('nav-active');
    history.pushState( btn, '', btn );
}

const loadPage = async () => {
    let headerContent = await createHeader();
    headerContent.map( (el) => header.append(el) );
    let buttons = await createNav();
    buttons.map( (button) => nav.append(button) );

    switch (true) {
        case (window.location.pathname == '/') : loadMain('movies'); break;
        case (window.location.pathname == '/movies') : loadMain('movies'); break;
        case (window.location.pathname == '/tvs') : loadMain('tvs'); break;
    }

}

// Browser history        
window.onpopstate = () => { loadMain(history.state); };