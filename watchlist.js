const searchResults = document.getElementById("search-results");
const savedMoviesIDs = JSON.parse(localStorage.getItem("savedMoviesIDs")) || [];
let emptySearch = document.getElementById("empy_state");
const apikey = "bc20f6e3";

if (savedMoviesIDs.length > 0) {
  printSavedMovies();
  emptySearch.style.display = "none";
}

async function printSavedMovies() {
  const savedMoviesIDs =
    JSON.parse(localStorage.getItem("savedMoviesIDs")) || [];
  for (const id of savedMoviesIDs) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apikey}&i=${id}`
    );
    const movie = await res.json();
    if (movie.Response !== "False") {
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
                  <button class="add-btn" id="${movie.imdbID}">Remove</button>
                </div>

                <p class="movie_plot">
                    ${movie.Plot}
                </p>
              </div>
            </article>
          </div>`;
    }
  }
}

searchResults.addEventListener("click", function (event) {
  if (event.target.className === "add-btn") {
    const movieID = event.target.id;
    const index = savedMoviesIDs.indexOf(movieID);
    if (index !== -1) {
      savedMoviesIDs.splice(index, 1);
      localStorage.setItem("savedMoviesIDs", JSON.stringify(savedMoviesIDs));
      searchResults.innerHTML = ""; // Clear the current list
      printSavedMovies(); // Print the updated list
      if (savedMoviesIDs.length === 0) {
        emptySearch.style.display = "block";
      }
    }
  }
});
