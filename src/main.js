import React from 'react';

import Spinner from 'react-spinner';

import {log} from './utils.js';
import SongList from './songlist.js';
import Player from './player.js';

import './spinner.css';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
    };

    this.playSong = this.playSong.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});

    this.loadSongs();
  }

  playSong(song) {
    this.player.playSong(song);
  }

  loadSongs() {
    let {daap} = this.context;

    daap.items({sort: 'artist'}).then(items => {
      log.debug('Loaded ' + items.length + ' songs');
      this.setState({songs: items.get(), loading: false});
    });
  }

  render() {
    let {songs, loading} = this.state;
    return (
      <div>
        {songs.length > 0 &&
          <Player ref={ref => this.player = ref}/>
        }
        {loading &&
          <div className="spinner">
            <Spinner/>
          </div>
        }
        {songs.length > 0 &&
          <SongList songs={songs} onClick={this.playSong}/>
        }
      </div>
    );
  }
};

Main.contextTypes = {
  daap: React.PropTypes.object.isRequired,
};

export default Main;

// vim: set ts=2 sw=2 tw=80:
