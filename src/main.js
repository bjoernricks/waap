import React from 'react';

import SongList from './songlist.js';

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

  loadSongs() {
    let {daap} = this.context;
    daap.items({max: 50}).then(songs => {
      this.setState({songs});
    });
  }

  playSong(song) {
    console.log('Start to playing song');
    this.audio.setAttribute('type', 'audio/' + song.format);
    this.audio.setAttribute('src', song.stream_url);
  }

  render() {
    let {songs} = this.state;
    return (
        <div>
          <audio ref={ref => this.audio = ref}
            controls>Your browser doesn't support audio </audio>
          <SongList songs={songs}/>
        </div>
    );
  }
};

Main.contextTypes = {
  daap: React.PropTypes.object.isRequired,
};

export default Main;

// vim: set ts=2 sw=2 tw=80:
