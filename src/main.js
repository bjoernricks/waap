import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {darkBlack} from 'material-ui/styles/colors';

import './songlist.css';

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

class SongList extends React.Component {

  render() {
    let {songs, onClick} = this.props;
    let songitems = songs.map(song => {
      return (
        <SongItem className="songitem" song={song} key={song.id}
          onClick={onClick}/>
      );
    })
    return (
      <List className="songlist">
        <Subheader>Songs</Subheader>
        {songitems}
      </List>
    );
  }
}

class SongItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.song);
    }
  }

  render() {
    let {song} = this.props;
    return (
      <ListItem primaryText={song.name}
        onClick={this.handleClick}
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>{song.artist}</span> -
            {song.album}
          </p>
        }
        secondaryTextLines={2} />
    );
  }
}

export default Main;

// vim: set ts=2 sw=2 tw=80:
