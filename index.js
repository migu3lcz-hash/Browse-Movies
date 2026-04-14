//http://www.omdbapi.com/?apikey=6780b565& http://img.omdbapi.com/?apikey=6780b565&

let timeout;
let currentMovies = [];

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

    currentMovies = data.Search || [];
    displayMovies(currentMovies)
}

function filterMovies(event) {
    const value = event.target.value;

    let sortedMovies = [...currentMovies];

    switch (value) {
        case "alpha":
            sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
            break;

        case "reverse":
            sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
            break;

        case "newest":
            sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
            break;
        
        case "oldest":
            sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
            break;
    }
    displayMovies(sortedMovies);
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


