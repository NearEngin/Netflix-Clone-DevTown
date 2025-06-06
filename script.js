const API_KEY = '83c12d3c3c915d71810c7389074fd9cf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMovies(url, containerId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, containerId);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.classList.add('row-poster');
            img.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
            img.alt = movie.title || movie.name;
            container.appendChild(img);
        }
    });
}

// Fetch movie rows
fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`, 'popular-movies');
fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, 'top-rated-movies');
fetchMovies(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`, 'upcoming-movies');
fetchMovies(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`, 'trending-movies');

// Add scrolling functionality
const scrollButtons = document.querySelectorAll('.scroll-btn');

scrollButtons.forEach(button => {
    button.addEventListener('click', () => {
        const row = document.querySelector(button.getAttribute('data-target'));
        const scrollAmount = row.clientWidth; // Scroll one "page" at a time
        if (button.classList.contains('left')) {
            row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});
