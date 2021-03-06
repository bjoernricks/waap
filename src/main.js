import React from 'react';

import SongList from './songlist.js';
import Player from './player.js';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [],
    };

    this.playSong = this.playSong.bind(this);
  }
  componentDidMount() {
    this.loadSongs();
  }

  playSong(song) {
    this.player.playSong(song);
  }

  loadSongs() {
    let {daap} = this.context;
    daap.items({max: 50, sort: 'artist'}).then(songs => {
      this.setState({songs});
    });
  }

  render() {
    let {songs} = this.state;
    return (
      <div>
        {songs.length > 0 &&
          <Player ref={ref => this.player = ref}/>
        }
        <SongList songs={songs} onClick={this.playSong}/>
      </div>
    );
  }
};

Main.contextTypes = {
  daap: React.PropTypes.object.isRequired,
};

export default Main;

// vim: set ts=2 sw=2 tw=80:
