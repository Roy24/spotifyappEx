import React from 'react';
import Track from '../track/track';

//Nothing special here. Pass down informations
class TrackList extends React.Component {
    render(){
        return (
            <div className="TrackList">
                {
                    this.props.trackList.map(track => {
                        return <Track track={track} key={track.id}  setPlayList={this.props.setPlayList}/>
                    })
                }
            </div>
        )     
    }
}

export default TrackList;