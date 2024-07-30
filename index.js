const form = document.getElementById('search-form')
const inputEl = document.getElementById('search-input')
const filmListContainer =document.getElementById('film-list-from-API')

form.addEventListener('submit', async function(e){
    e.preventDefault()
    let title = inputEl.value
    findMoviesID(title)
    title = ''
})

 async function findMoviesID(title){
    const response = await fetch (`http://www.omdbapi.com/?apikey=9a04ff24&s=${title}`)
    const data = await response.json()
    const movies = await data.Search
    const movieID =  await movies.map( movie => movie.imdbID)
    const movieObj =  await Promise.all(movieID.map(async id => getMoviesData(id) ))

    const moviesHtml = movieObj.map(movie =>{
        const{Title, Runtime,imdbRating,Plot,Poster,Genre,imdbID} = movie
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
                    <button id='${imdbID}'><i class="fa-solid fa-circle-plus"></i> Watchist</button>
                </div>
                <p class="plot">${Plot}</p>

            </div>
        </div>
        <hr>
        
        `

    }).join('')
    filmListContainer.innerHTML = moviesHtml
}

async function getMoviesData(id){
    const response = await fetch(`http://www.omdbapi.com/?apikey=9a04ff24&i=${id}&plot=short`)
    const data = await response.json()
    return data 
}
                 


/* 
from the API

<div class="movie">
<img src="./img/image 33.png" alt="">

<div class="description">
    <div class="movie-header" id="movie-header">
        <h2 class="title">TITLE</h2>
        <i class="fa-solid fa-star"></i>
        <p >RATINGS</p>
    </div>
    <div class="details">
        <h3>RUNTIME</h3>
        <h3>GENRE</h3>
        <button id=''><i class="fa-solid fa-circle-plus"></i> Watchist</button>
    </div>
    <p class="plot">PLOT</p>

</div>
</div>
<hr> */

/* 
from the LocalStorage

<div class="movie">
<img src="./img/image 33.png" alt="">

<div class="description">
    <div class="movie-header" id="movie-header">
        <h2 class="title">Blade Runner</h2>
        <i class="fa-solid fa-star"></i>
        <p >8.1</p>
    </div>
    <div class="details">
        <h3>116 min</h3>
        <h3>Drama, Mystery, Sci-fi</h3>
        <button><i class="fa-solid fa-circle-minus"></i> Remove</button>
    </div>
    <p class="plot">Lorem ipsum dolor sit amet, 
        consectetuer adipiscing elit. 
        Maecenas porttitor congue massa. 
    </p>

</div>
</div>
<hr> */