import SpotifyConnect from './spotifyconnect';

const SpotifySearch = {
    search(query){
        //Get token or generate one if needed
        const accessToken = SpotifyConnect.getToken();
        //Query the API, limit is 20
        return fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`,
            {
                headers:{'Authorization': `Bearer ${accessToken}`,'Accept': 'application/json'}
            }
        ).then(response => 
            {
                if (response.ok){
                    return response.json();
                }
                throw new Error('Request failed!');
            },
            networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            // Get the relevant information for each track
            if (jsonResponse.tracks.items) {
                return  jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    imageSrc: track.album.images[2].url,
                    album: track.album.name,
                    artist: track.artists[0].name,
                    title: track.name,
                    URi: track.uri,
                    addRemove: '+'
                }));
            }
        });
    }
}

export default SpotifySearch;