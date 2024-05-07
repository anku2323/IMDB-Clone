let sideOption = document.getElementById("side");

function showMenu() {
    sideOption.style.left = "0";
}

function hideMenu() {
    sideOption.style.left = "-300px";
}

let container = document.getElementById('movies');
let search = document.getElementById('searchMovie');

const API_KEY = 'api_key=49e3be45df1c1a483b5eb9560e3c73ab';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

let id = '';
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    if (key === 'id') {
        id = value;
        break;
    }
}
let link = `/movie/${id}?language=en-US&append_to_response=videos&`;
let find_url = `${BASE_URL}${link}${API_KEY}`;

apiCall(find_url);

function apiCall(url) {
    const x = new XMLHttpRequest();
    x.open('GET', url);
    x.send();
    x.onload = function () {
        if (x.status === 200) {
            const res = x.response;
            const jsonData = JSON.parse(res);
            getMovies(jsonData);
        } else {
            console.error('Failed to fetch data');
        }
    }
    x.onerror = function () {
        console.error('Network error occurred');
    }
}

function filterArray(obj) {
    return obj.name.match(/Official Trailer/i);
}

function getMovies(movieData) {
    const movieTrailer = movieData.videos.results.filter(filterArray);
    document.body.style.backgroundImage = `url(${IMAGE_URL}${movieData.backdrop_path})`;

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('poster-detals');

    let youtubeURL = '';
    if (movieTrailer.length > 0) {
        youtubeURL = `https://www.youtube.com/embed/${movieTrailer[0].key}`;
    } else if (movieData.videos.results.length > 0) {
        youtubeURL = `https://www.youtube.com/embed/${movieData.videos.results[0].key}`;
    }

    movieDiv.innerHTML = `
        <div class="movie-poster">
            <img src="${IMAGE_URL}${movieData.poster_path}" alt="Poster">
        </div>
        <div class="movie-details">
            <div class="title">${movieData.title}</div>
            <div class="tagline">${movieData.tagline}</div>
            <div style="display: flex;">
                <div class="movie-duration">
                    <b><i class="fas fa-clock"></i></b> ${movieData.runtime}
                </div>
                <div class="release-date">
                    <b>Released</b>: ${movieData.release_date}
                </div>
            </div>
            <div class="rating">
                <b>IMDb Rating</b>: ${movieData.vote_average}
            </div>
            <div class="trailer-div" id="trailer-div-btn">
                <span>Play Movie</span> <i class="fab fa-youtube"></i>
            </div>
            <span><iframe width="460" height="250" src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>
            <div class="plot">${movieData.overview}</div>
        </div>
    `;
    document.getElementById('movie-display').appendChild(movieDiv);
}
