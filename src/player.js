import React from 'react';

export class Player extends React.Component {

  constructor(...args) {
    super(...args);

    this.playSong = this.playSong.bind(this);
  }

  playSong(song) {
    console.log('Start to playing song');
    this.audio.setAttribute('type', 'audio/' + song.format);
    this.audio.setAttribute('src', song.streamUrl);
    this.audio.play();
  }

  render() {
    return (
      <div className="player">
        <audio ref={ref => this.audio = ref} controls>
          Your browser doesn't support audio.
        </audio>
      </div>
    );
  }
}

export default Player;

// vim: set ts=2 sw=2 tw=80:
