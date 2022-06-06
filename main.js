//connected
//console.log('Is this thing on?')

//create main box for data
const myTunes = document.querySelector('.myTunes');

//variables
const iTunesURL = 'https://proxy-itunes-api.glitch.me/search?term=jack+johnson&limit=25';

//fetch request to iTunes API 
fetch (iTunesURL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    buildProfileLoop(data);
});

function buildProfileLoop(songs) {
    for (let song of songs.results) {
        // console.log(song.trackName)
        songTitle = song.trackName
        artist = song.artistName
        albumCover = song.artworkUrl100
        // console.log(songTitle)
        // console.log(artist) {
        buildProfileElement(song)
        }
    }
    
function buildProfileElement() {
    //album cover
        let coverElement = document.createElement('img');
        coverElement.classList.add('cover');
        coverElement.src = `${albumCover}`;
        coverElement.alt = "album cover artowrk";
        myTunes.appendChild(coverElement);      

    //song title
        let songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerText = `Song Title: ${songTitle}`;
        console.log(songElement);
        myTunes.appendChild(songElement);
    
    //artist 
        let nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.innerText = `Artist: ${artist}`;
        myTunes.appendChild(nameElement);
        console.log(nameElement);
    }
