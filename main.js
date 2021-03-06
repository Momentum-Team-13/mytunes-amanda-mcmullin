//check connection
//console.log('Is this thing on?');


//variables
// const iTunesURL = 'https://proxy-itunes-api.glitch.me/search?term=jack+johnson&limit=25';
const myTunes = document.querySelector('#myTunes');
const searchButton = document.querySelector("#searchButton");
const searchBox = document.querySelector("#searchBox");


//event listener for search button 
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    myTunes.innerHTML = "";
    // console.log(searchBox.value);
    let userInput = searchBox.value;
    let userSearch = `https://itunes.apple.com/search?term=${userInput}&limit=20&music=musicArtist`;

//fetch request to iTunes API 
    fetch (userSearch, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("API returned results: ", data.results);

            //if no results are returned let user know
            if (data.results.length < 1) {
                let noResultsElement = document.createElement('p');
                noResultsElement.innerText = "Sorry, no results were found.";
                noResultsElement.classList.add = ("noResults");
                myTunes.appendChild(noResultsElement);
            }

            if (data.results.length > 0) {
                let playElement = document.createElement('div');
                playElement.innerText = "Song preview available when album cover is clicked!";
                playElement.classList.add = ("nowPlaying");
                nowPlaying.appendChild(playElement);
            }

            //create elements for each returned song
            for (let item of data.results) {
                //album/song/artist card info
                let searchElement = document.createElement('div');
                searchElement.classList.add("songCardInfo");

            //album cover    
                let coverElement = document.createElement('img');
                coverElement.classList.add('cover');
                coverElement.src = item.artworkUrl100;
                coverElement.alt = "Cover artwork for album";
                searchElement.appendChild(coverElement);      
            
                coverElement.addEventListener("click", (event) => {
                    // console.log("Play the song!");
                    let sound = document.querySelector('audio');
                    sound.id = 'audio=player';
                    sound.controls = 'controls';
                    sound.src = `${item.previewUrl}`;
                    sound.type = 'audio/mpeg';
                    nowPlaying.innerText = `Now Playing: ${item.trackName} by ${item.artistName} \n \n To hear a different preview, click another album cover!`;
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
        //catch the errors!
        .catch(err => {
            window.alert("Error detected. Please try again.");
        })
})