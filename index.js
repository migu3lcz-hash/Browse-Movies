//http://www.omdbapi.com/?apikey=6780b565& http://img.omdbapi.com/?apikey=6780b565&

let timeout;

const input = document.getElementById("search-input");
const resultsContainer = document.querySelector(".search__results--container");
const searchBtn = document.querySelector(".click-movie");
const searchText = document.getElementById("search-term")

searchBtn.addEventListener("click", () => {
    getMovies(input.value)
});

input.addEventListener("input", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        getMovies(input.value);
    }, 400);
})

async function getMovies(searchTerm) {
    if (!searchTerm) {
        searchText.textContent = "";
        resultsContainer.innerHTML = "";
        return;
    }

    searchText.textContent = searchTerm;

    const response = await fetch (`https://www.omdbapi.com/?apikey=6780b565&s=${encodeURIComponent(searchTerm)}`)
    const data = await response.json();

    displayMovies(data.Search || [])
}

function displayMovies(movies) {
    resultsContainer.innerHTML = "";

    if (movies.length === 0) {
        resultsContainer.innerHTML = "<p>No movies found</p>"
        return;
    }

movies.forEach(movie => {
        const movieHTML = `
        <div class="search__result--container">
                <div class="search__result--img">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" alt="${movie.Title}">
                </div>
                <div class="search__result--title">
                    <h1 class="movie__title">${movie.Title}</h1>
                </div>
        </div>
        `;

        resultsContainer.innerHTML += movieHTML
    })
}


