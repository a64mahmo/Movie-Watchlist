const searchResults = document.getElementById("search-results");
const savedMoviesIDs = JSON.parse(localStorage.getItem("savedMoviesIDs")) || [];
let emptySearch = document.getElementById("empy_state");
const apikey = "bc20f6e3";

if (savedMoviesIDs.length > 0) {
  printSavedMovies();
  emptySearch.style.display = "none";
}

async function printSavedMovies() {
  const savedMovie