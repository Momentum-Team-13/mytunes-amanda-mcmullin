//check connection
//console.log('Is this thing on?');


//variables
// const iTunesURL = 'https://proxy-itunes-api.glitch.me/search?term=jack+johnson&limit=25';
const myTunes = document.querySelector('#myTunes');
let form = document.querySelector("#myForm");
let searchButton = document.querySelector("#searchButton");
let searchBox = document.querySelector("#searchBox");
let audioPlayer = document.querySelector("#audioPlayer");
let iTunesURL = "https://itunes.apple.com/search?term=";


//event listener for search click/return 
// use submit instead of click - submit captures clicks on button and when enter key is pressed 
form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    myTunes.innerHTML = ""
    // console.log(searchBox.value);
    let userInput = searchBox.value;
    let limitSearch = "&limit=15";
    let userSearch = iTunesURL + userInput + limitSearch;
    console.log(userSearch)


    //fetch request to iTunes API 
    fetch (userSearch, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        buildSongCard(data);
    })

    //function to build returned data
    function buildSongCard(searchData) {
        let searchElement = document.createElement('div')

        for (item of searchData.results) {
            // console.log(item.trackName)
            albumCover = item.artworkUrl100
            songTitle = item.trackName
            artist = item.artistName
            // console.log(songTitle)
            // console.log(artist) 

        //album cover    
            let coverElement = document.createElement('img');
            coverElement.classList.add('cover');
            coverElement.src = `${albumCover}`;
            coverElement.alt = "Cover artwork for album containing " + `${songTitle} by ${artist}`;
            searchElement.appendChild(coverElement);      

        //song title
            let songElement = document.createElement('div');
            songElement.classList.add('song');
            songElement.innerText = `${songTitle}`;
            // console.log(songElement);
            searchElement.appendChild(songElement);
        
        //artist 
            let nameElement = document.createElement('div');
            nameElement.classList.add('artist');
            nameElement.innerText = `${artist}`;
            searchElement.appendChild(nameElement);
            // console.log(nameElement);
        }
        myTunes.appendChild(searchElement)
    }
})
