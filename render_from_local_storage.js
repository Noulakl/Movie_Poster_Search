const watchListContainer = document.getElementById('film-list-from-storage')
const moviesFromLocalStorage = JSON.parse(localStorage.getItem('watchList'))
document.addEventListener('click', e =>{
    if (e.target.dataset.remove){
        console.log('remove')
        removeFromLocalStorage(e.target.dataset.remove)
       }
})

if(moviesFromLocalStorage && moviesFromLocalStorage.length > 0){
    renderLocalStorageMovies()
} else{
    watchListContainer.innerHTML = `
            <div class="place-holder">
                <p>Your watchlist is looking a little empty...</p>
                <a href="./index.html"><i class="fa-solid fa-circle-plus" id="plus-holder"></i> Let’s add some movies!</a>
            </div>
    `
}

function renderLocalStorageMovies() {
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem('watchList'))
  const moviesHtml = moviesFromLocalStorage.map(movie => {
    const { Title, Runtime, imdbRating, Plot, Poster, Genre, imdbID } = movie
    return `
      <div class="movie">
        <img src="${Poster}" alt="">
        <div class="description">
          <div class="movie-header" id="movie-header">
            <h2 class="title">${Title}</h2>
            <i class="fa-solid fa-star"></i>
            <p>${imdbRating}</p>
          </div>
          <div class="details">
            <h3>${Runtime}</h3>
            <h3>${Genre}</h3>
            <button id='${imdbID}' data-remove='${imdbID}'><i class="fa-solid fa-circle-minus"></i> Remove</button>
          </div>
          <p class="plot">${Plot}</p>
        </div>
      </div>
      <hr>
    `
  }).join('')
  watchListContainer.innerHTML = moviesHtml
}

function removeFromLocalStorage(id) {
  const filteredMovies = moviesFromLocalStorage.filter(movie => movie.imdbID !== id)
  localStorage.setItem('watchList', JSON.stringify(filteredMovies))
  renderLocalStorageMovies() 
}