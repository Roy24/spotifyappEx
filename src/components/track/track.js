import React from 'react';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            track: {}/*,
            addRemove: 'add'*/
        };
        this.handlePlayList = this.handlePlayList.bind(this);
    }

    //Handle click on track to remove or add in the Playlist
    // Pass information to parent to modify the playlist
    handlePlayList(event){
        this.setState({track: this.props.track});
        this.props.setPlayList(this.props.track);
        event.preventDefault();
    }

    render(){
        return (
            <div className="Track" key={this.props.track.id}>
                <div className="Track-information">
                    <h3>{this.props.track.title}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className='Track-action' onClick={this.handlePlayList}>{this.props.track.addRemove}</a>
            </div>
        ) 
    }
}

export default Track;