function showMenu() {
    let sideMenu = document.getElementById("side");
    sideMenu.style.left = "0";
}

function hideMenu() {
    let sideMenu = document.getElementById("side");
    sideMenu.style.left = "-300px";
}

const API_KEY = 'api_key=49e3be45df1c1a483b5eb9560e3c73ab';

const API_URL = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

let container = document.getElementById('movies');
let search = document.getElementById('searchMovie');


apiCall(API_URL);

async function apiCall(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderMovies(movies) {
    console.log(movies);
    container.innerHTML = "";
    movies.forEach(movie => moviesElement(movie));
}

function moviesElement(movie) {
    let movieElement = document.createElement('div');
    movieElement.classList.add('movie-element');
    movieElement.innerHTML = `
    <div class="poster-container">
        <a href="about.html?id=${movie.id}">
            <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.id}">
        </a>
    </div>
    <div class="movie-info">
        <h3>${movie.title}</h3>
        <div class="star-fab">
            <span class="plus" id="${movie.id}" onclick="addMovie(${movie.id})">
                <span><i class="fas fa-plus"></i></span>
            </span>
            <span class="icon-color"><i class="fa-solid fa-star">&nbsp;</i>${movie.vote_average}</span>
        </div>
    </div>
    `;
    console.log(movie.id);
    container.appendChild(movieElement);

    // let posterContainer = movieElement.querySelector('.poster-container');
    // posterContainer.addEventListener('click', function() {
    //     window.location.href = 'about.html';
    // });
}

search.addEventListener('keyup', function () {
    let input = search.value.trim(); 
    if (input.length !== 0) {
        let inputUrl = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${encodeURIComponent(input)}`;
        apiCall(inputUrl);
    } else {
        window.location.reload();
    }
});
