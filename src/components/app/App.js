import React, { Component } from 'react';
import TrackList from '../../components/tracklist/tracklist';
import SearchBar from '../../components/search/searchbar.js';
import SpotifySearch from '../../util/spotify/spotifysearch';
import SpotifySave from '../../util/spotify/spotifysave';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      trackList: [],
      playList: [],
      playListName: '',
      saveClass: 'hidden'
    };
    this.searchTrack = this.searchTrack.bind(this);
    this.setPlayList = this.setPlayList.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
  }

  // Query the Spotify API and update the tracklist
  searchTrack(song){
    // No query if nothing was typed
    if (song !== '') {      
      SpotifySearch.search(song).then(trackList => {
        this.setState({trackList: trackList});
      })
    }
    if (this.state.playListName !== ''){
      this.setState({saveClass: ''})
    }
  }

  // Check if track will be added or removed from playlist
  addOrRemove(trackId, list){
    var result = -1;
    list.forEach(function(obj, index) {
        if ('id' in obj && obj['id'] === trackId) {
            result = index;
            return result;
        }
    });
    return result;
  }

  // Add or Remove a track to the playlist and update the click icon
  setPlayList(track){
    //Store both lists to make changes (change +- and add or remove track from playlist)
    let statePlayList = this.state.playList;
    let stateTrackList = this.state.trackList;
    //Get index to change the + and -
    const trackIndexPlayList = this.addOrRemove(track.id, statePlayList);
    const trackIndexTrackList = this.addOrRemove(track.id, stateTrackList);
    // Is in PlayList, let's remove it
    if(trackIndexPlayList > -1 ){
      statePlayList.splice(trackIndexPlayList,1);
      this.setState({playList: statePlayList});
      // Additional check if remove after a new search. TrackList doest not need an update
      if(trackIndexTrackList > -1 ){
        stateTrackList[trackIndexTrackList].addRemove = '+';
        this.setState({trackList: stateTrackList});
      }
    } else {
      // Is not in PlayList, let's add it
      statePlayList.push(track);
      stateTrackList[trackIndexTrackList].addRemove = '-';
      this.setState({trackList: stateTrackList,playList: statePlayList});
    }
  }
    
  // Get playlist name and change class of button if all conditions are true
  // avoid sending empty request
  handleNameChange(event){
      this.setState({playListName: event.target.value});
      if (this.state.playList.length > 0){
        this.setState({saveClass: ''})
      }
  }

  //Save the Playlist and clear the current playlist and name
  handleSavePlaylist(event){
    SpotifySave.makePlaylist(this.state.playListName,this.state.playList).then(
      this.setState({playList: [],
        playListName: '',
        saveClass:'hidden'
      }),
      document.getElementById('PlayListName').value=''
    )
  }

  render() {
    return (
      <div className='app'>
        <SearchBar searchTrack={this.searchTrack}/>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList trackList={this.state.trackList} setPlayList={this.setPlayList}/>
          </div>
          <div className="Playlist">
            <input id='PlayListName' placeholder='Name your Playlist'  onChange={this.handleNameChange} />
            <TrackList trackList={this.state.playList} setPlayList={this.setPlayList}/>
            <a className={this.state.saveClass + ' Playlist-save'} onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
