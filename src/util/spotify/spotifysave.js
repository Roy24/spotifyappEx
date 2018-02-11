import SpotifyConnect from './spotifyconnect';

const SpotifySave = {   
    makePlaylist(name,playList){
        // Get back a token or generate a newone if needed
        const accessToken = SpotifyConnect.getToken();
        // Generate the playList export (only URi)
        const playListExport = playList.map(track => {
            return  track.URi;
        });
        // Get user ID
        return fetch('https://api.spotify.com/v1/me',
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
        // If user ID retrieved, create playlist and get playlist ID
        if (jsonResponse.id) {
            return fetch(`https://api.spotify.com/v1/users/${jsonResponse.id}/playlists`,{
                method:'POST',
                headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-type': 'application/json'
                },
            body:JSON.stringify({'name': name,'public':true})
            })
        }
    }).then(response => {
          if (response.ok){
            return response.json();
          }
          throw new Error('Request failed!');
        },networkError => console.log(networkError.message)).then(jsonResponse => { 
            //Add tracks to the playlist
            return fetch(`https://api.spotify.com/v1/users/omegatheory/playlists/${jsonResponse.id}/tracks`,{
                method:'POST',
                headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-type': 'application/json'
                },
            body:JSON.stringify({'position': 0,'uris':playListExport})
            })
        }).then(response => {
            if (response.ok){
                return true;
            }
            throw new Error('Request failed!');
        },networkError => console.log(networkError.message))
    }
}

export default SpotifySave;