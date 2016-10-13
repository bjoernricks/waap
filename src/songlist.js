import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import {darkBlack} from 'material-ui/styles/colors';

import './songlist.css';

export class SongList extends React.Component {

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

export class SongItem extends React.Component {

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

export default SongList;

// vim: set ts=2 sw=2 tw=80:
