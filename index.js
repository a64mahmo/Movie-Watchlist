// Global variables
let searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
let emptySearch = document.getElementById("empy_state");
const apikey = "bc20f6e3";

// Event listener for search input
searchInput.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    // Your search logic here
    const searchTerm = searchInput.value;
    if (searchTerm) {
      clearSearchInput();
      handleSearch(searchTerm);
      emptySearch.style.display = "none";
    }
  }
});

// Function to handle search
async function handleSearch(searchTerm) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`
  );
  const movieList = await res.json();

  let movieIDList = [];

  if (movieList.Response === "False") {
    searchResults.innerHTML = '<h1 class="no-results"> No results found </h1>';
    console.log("No movies found");
    return;
  } else {
    movieList.Search.forEach((movie) => {
      movieIDList.push(movie.imdbID);
    });

    handleSearchID(movieIDList);
    clearSearchResults();
  }
}

// Function to handle search by movie ID
async function handleSearchID(movieIDList) {
  let movieList = [];
  for (const movieID of movieIDList) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${apikey}&i=${movieID}`
    );
    const movie = await res.json();
    movieList.push(movie);
  }
  printMovies(movieList);
}

// Function to clear search results
function clearSearchResults() {
  searchResults.innerHTML = "";
}

// Function to clear search input
function clearSearchInput() {
  searchInput.value = "";
}

// Function to print movies

function printMovies(movies) {
  if (movies) {
    movies.forEach((movie) => {
      searchResults.innerHTML += `
            <div class="border-wrap">
            <article class="movie_card ">
              <img
              class="movie_poster"
              src="${movie.Poster}"
              alt="${movie.Title}"/>

              <div class="card_info">
                <div class="card_title">
                  <h1 class="movie_title">${movie.Title}</h1>
                  <p class="movie_ratings">⭐️ ${movie.Ratings[0].Value}</p>
                </div>

                <div class="card_action">
                  <p class="movie_runtime">${movie.Runtime}</p>
                  <p class="movie_genre">${movie.Genre}</p>
                  <button class="add-btn" id="${movie.imdbID}">Add</button>
                </div>

                <p class="movie_plot">
                    ${movie.Plot}
                </p>
              </div>
            </article>
          </div>`;
    });
  }
}

let savedMoviesIDs = [];
searchResults.addEventListener("click", function (event) {
  if (event.target.className === "add-btn") {
    const movieID = event.target.id;
    if (!savedMoviesIDs.includes(movieID)) {
      savedMoviesIDs.push(movieID);
      localStorage.setItem("savedMoviesIDs", JSON.stringify(savedMoviesIDs));
    }
  }
  console.log(savedMoviesIDs);
});

// Function to print saved movies
function printSavedMovies() {
  const savedMoviesIDs = JSON.parse(localStorage.getItem("savedMoviesIDs"));
  if (savedMoviesIDs) {
    handleSearchID(savedMoviesIDs);
  }
}
