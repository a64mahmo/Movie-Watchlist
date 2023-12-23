

let searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let searchBtn = document.getElementById('search-btn');
let emptySearch = document.getElementById('empy_state');
const apikey = 'bc20f6e3';

// create a new keyboard event and set the key to "Enter"
const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  });
  

async function handleSearch(searchTerm) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`);
    const movieList = await res.json();
    
    let movieIDList = [];

    movieList.Search.forEach(movie => {
        movieIDList.push(movie.imdbID);
    });
    
    handleSearchID(movieIDList);
    clearSearchResults();
}

async function handleSearchID(movieIDList) {
    let movieList = [];
    for (const movieID of movieIDList) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${movieID}`);
        const movie = await res.json();
        movieList.push(movie);
    }
    printMovies(movieList);
}

function clearSearchResults() {
    searchResults.innerHTML = '';
}

function clearSearchInput() {
    searchInput.value = '';
}

function printMovies(movies) {
    if(movies) {
        movies.forEach(movie => {
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
                  <p class="movie_ratings">⭐️ ${movie.Runtime}</p>
                </div>

                <div class="card_action">
                  <p class="movie_runtime">${movie.Runtime}</p>
                  <p class="movie_genre">${movie.Genre}</p>
                  <button class="add-btn">Add</button>
                </div>

                <p class="movie_plot">
                    ${movie.Plot}
                </p>
              </div>
            </article>
          </div>`;
        });
    } else {
        searchResults.innerHTML += '<h1 class="no-results"> No results found </h1>';
        console.log('No movies found');
    }
}


// searchInput.dispatchEvent('click', e => {
//     e.preventDefault();
// });

searchInput.addEventListener('keyup', function(event) {
    
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
            emptySearch.style.display = 'none';
        
        }
    }
  });



