import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {log, is_defined, is_string} from './utils.js';
import SongList from './songlist.js';
import Player from './player.js';
import Spinner from './spinner.js';
import Layout from './layout.js';
import SearchField from './searchfield.js';

import Header from './header.js';

import './main.css';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      filtered_songs: [],
      loading: true,
      sort: 'artist',
    };

    this.playSong = this.playSong.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.filterSongs = this.filterSongs.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});

    this.loadSongs();
  }

  playSong(song) {
    this.player.playSong(song);
  }

  loadSongs(sort) {
    let {daap} = this.context;
    if (!is_defined(sort)) {
      sort = this.state.sort;
    }

    this.setState({loading: true});

    daap.items({sort}).then(items => {
      log.debug('Loaded ' + items.length + ' songs. Sorted by ' + sort);
      let songs = items.get();
      this.setState({songs, filtered_songs: songs, loading: false, sort});
    });
  }

  filterSongs(value) {
    let {songs} = this.state;
    let filtered_songs = songs;

    if (is_string(value) && value.length > 1) {
      value = value.toLowerCase();

      filtered_songs = songs.filter(song => {
        return song.name.toLowerCase().indexOf(value) !== -1 ||
          song.album.toLowerCase().indexOf(value) !== -1 ||
          song.artist.toLowerCase().indexOf(value) !== -1;
      });
    }

    this.setState({filtered_songs});
  }

  handleSortChange(event, index, value) {
    this.loadSongs(value);
  }

  render() {
    let {filtered_songs, songs, loading, sort} = this.state;
    return (
      <div>
        <Header>
          {songs.length > 0 &&
            <Player ref={ref => this.player = ref}/>
          }
        </Header>

        <Layout flex align={['space-between', 'center']}>
          <SearchField className="filter-songs"
            hintText="Search" onChange={this.filterSongs}/>
          <div className="sort-songs">
            <SelectField id="sortby"
              value={sort}
              onChange={this.handleSortChange}>
              <MenuItem value="artist" primaryText="Artist"/>
              <MenuItem value="album" primaryText="Album"/>
              <MenuItem value="name" primaryText="Name"/>
              <MenuItem value="releasedate" primaryText="Release Date"/>
            </SelectField>
          </div>
        </Layout>

        {loading &&
          <Layout flex align="center">
            <Spinner/>
          </Layout>
        }

        {songs.length > 0 &&
          <SongList songs={filtered_songs} onClick={this.playSong}/>
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
