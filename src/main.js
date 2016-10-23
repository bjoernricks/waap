import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {log, is_defined} from './utils.js';
import SongList from './songlist.js';
import Player from './player.js';
import Spinner from './spinner.js';
import Layout from './layout.js';

import Header from './header.js';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
      sort: 'artist',
    };

    this.playSong = this.playSong.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
      this.setState({songs: items.get(50), loading: false, sort});
    });
  }

  handleSortChange(event, index, value) {
    this.loadSongs(value);
  }

  render() {
    let {songs, loading, sort} = this.state;
    return (
      <div>
        <Header>
          {songs.length > 0 &&
            <Player ref={ref => this.player = ref}/>
          }
        </Header>

        <Layout flex align="end">
          <SelectField id="sortby"
            value={sort}
            onChange={this.handleSortChange}
            floatingLabelText="Sort by">
            <MenuItem value="artist" primaryText="Artist"/>
            <MenuItem value="album" primaryText="Album"/>
            <MenuItem value="name" primaryText="Name"/>
            <MenuItem value="releasedate" primaryText="Release Date"/>
          </SelectField>
        </Layout>

        {loading &&
          <Layout flex align="center">
            <Spinner/>
          </Layout>
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
