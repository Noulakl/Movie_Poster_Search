// Fetching DOM elements
const form = document.getElementById('search-form')
const inputEl = document.getElementById('search-input')
const filmListContainer =document.getElementById('film-list-from-API')
//  event listeners
form.addEventListener('submit', async function(e){
    let title = inputEl.value
    e.preventDefault()
    if(title){
        renderMovie(title)    
    } else{
        alert('Please enter a movie title')
    }
})
document.addEventListener('click', e => {
   if(e.target.dataset.readmore){
    console.log('readMore')
    readMore(e.target.dataset.readmore)
   } else if (e.target.dataset.add){
    console.log('add')
    pushToLocalStorage(e.target.dataset.add)
   }
})

// Async functions dealing with APIs
 async function renderMovie(title){
    const response = await fetch (`https://www.omdbapi.com/?apikey=9a04ff24&s=${title}`)
    const data = await response.json()
    try{
        const movies = await data.Search
        const movieID =  await movies.map( movie => movie.imdbID)
        const movieObj =  await Promise.all(movieID.map(async id => getMoviesData(id) ))
        const moviesHtml = movieObj.map(movie =>{
            const {Title, Runtime,imdbRating,Plot,Poster,Genre,imdbID} = movie
            return      `
            <div class="movie">
                <img src="${Poster}" alt="">
                <div class="description">
                    <div class="movie-header" id="movie-header">
                        <h2 class="title">${Title}</h2>
                        <i class="fa-solid fa-star"></i>
                        <p >${imdbRating}</p>
                    </div>
                    <div class="details">
                        <h3>${Runtime}</h3>
                        <h3>${Genre}</h3>
                        <button data-add='${imdbID}'><i class="fa-solid fa-circle-plus"></i> Watchist</button>
                    </div>
                    <p class="plot" id='plot${imdbID}'>${Plot}
                    <button class="read-more" data-readmore='${imdbID}'>..Read more</button>
                    </p>
                </div>
            </div>
            <hr>
           `
        }).join('')
        filmListContainer.innerHTML = moviesHtml
        return movieObj

    } catch (err){
        filmListContainer.innerHTML = `
        <div class="place-holder">
                <i class="fa-regular fa-face-frown-open"></i>
                <p>Sorry, could not find that movie</p>
        </div>
        `
    }
}

async function getMoviesData(id){
        const response = await fetch(`https://www.omdbapi.com/?apikey=9a04ff24&i=${id}&plot=short`)
        const data = await response.json()
        return data 
}
    
async function readMore(id){
    const response = await fetch(`https://www.omdbapi.com/?apikey=9a04ff24&i=${id}&plot=full`)
    const data = await response.json()
    console.log(data)
    const plotParagraph = document.getElementById(`plot${data.imdbID}`)
    plotParagraph.innerHTML = data.Plot
}

// LocalStorage
async function pushToLocalStorage(id){
    const movieObject = await getMoviesData(id)
    if(localStorage.getItem('watchList')){
        const moviesInLocal = JSON.parse(localStorage.getItem('watchList'))
        moviesInLocal.push(movieObject)
        localStorage.setItem('watchList', JSON.stringify(moviesInLocal))
        alert('You can now check it in your watch list')
    } else{
        const movies = [movieObject]
        localStorage.setItem('watchList', JSON.stringify(movies))
    }
}

