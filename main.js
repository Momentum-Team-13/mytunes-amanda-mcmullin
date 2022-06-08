//check connection
//console.log('Is this thing on?');


//variables
// const iTunesURL = 'https://proxy-itunes-api.glitch.me/search?term=jack+johnson&limit=25';
const myTunes = document.querySelector('#myTunes');
const searchButton = document.querySelector("#searchButton");
const searchBox = document.querySelector("#searchBox");


//event listener for search click/return 
searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    myTunes.innerHTML = ""
    console.log(searchBox.value);
    console.log(event)
    let userInput = searchBox.value;
    let userSearch = `https://itunes.apple.com/search?term=${userInput}&entity=song`
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
            console.log("api results: ",data.results);

            if (data.results.length < 1) {
                let noResultsElement = document.createElement('div')
                noResultsElement.innerText = "Sorry, no results were found."
                noResultsElement.classList.add = ("noResults")
                myTunes.appendChild(noResultsElement)
            }
            if (data.results.length > 0) {
                let playElement = document.createElement('div')
                playElement.innerText = "Click Album Cover to Play"
                playElement.classList.add = ("nowPlaying")
                nowPlaying.appendChild(playElement)
            }

            for (let item of data.results) {
                //album/song/artist card info
                let searchElement = document.createElement('div')
                searchElement.classList.add("songCardInfo")

            //album cover    
                let coverElement = document.createElement('img');
                coverElement.classList.add('cover');
                coverElement.src = item.artworkUrl100;
                coverElement.alt = "Cover artwork for album";
                searchElement.appendChild(coverElement);      
            
                coverElement.addEventListener("click", (event) => {
                    
                    console.log("Play the song!");
                    let sound = document.querySelector('audio');
                    sound.id = 'audio=player';
                    sound.controls = 'controls';
                    sound.src = `${item.previewUrl}`;
                    sound.type = 'audio/mpeg';
                    nowPlaying.innerText = `To hear a preview, click the album cover. \n Now Playing: ${item.trackName} by ${item.artistName}`;
                })

            //song title
                let songElement = document.createElement('div');
                songElement.classList.add('song');
                songElement.innerText = "Song Title: " + item.trackName;
                // console.log(songElement);
                searchElement.appendChild(songElement);
            
            //artist 
                let nameElement = document.createElement('div');
                nameElement.classList.add('artist');
                nameElement.innerText = "Artist: " + item.artistName;
                searchElement.appendChild(nameElement);
                // console.log(nameElement);
            
                //append all the things!!!    
                myTunes.appendChild(searchElement)
            }
        })
        .catch(err => {
            window.alert("Error detected. Please try again.");
        })
})