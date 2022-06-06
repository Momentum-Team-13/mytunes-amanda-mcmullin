const iTunesURL = 'https://itunes.apple.com/search?term=jack+johnson&limit=25'

fetch (iTunesURL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
.then (function(response){
    return response.json()
})
.then (function (data) {
    console.log(data)
});