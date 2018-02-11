import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'song': ''
        };
        this.handleSongChange = this.handleSongChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    // Store query
    handleSongChange(event){
        this.setState({song: event.target.value});
    }

    // Pass information to parent to launch a query
    handleSearch(event){
        this.props.searchTrack(this.state.song);
        event.preventDefault();
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song Title" onChange={this.handleSongChange} />
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );      
    }
}

export default SearchBar;