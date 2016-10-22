import React from 'react';

import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import SkipNext from 'material-ui/svg-icons/av/skip-next';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';

import 'howler';

import {log, is_defined, has_value} from './utils.js';

import Layout from './layout.js';
import Spinner from './spinner.js';

import './player.css';

function format_time(secs = 0) {
  secs = Math.round(secs);

  let minutes = Math.floor(secs / 60) || 0;
  let seconds = (secs - minutes * 60) || 0;

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const style = {
  mediumIcon: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
};

export class Player extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      song: {},
      has_previous: false,
      has_next: false,
      state: undefined,
    };

    this.playSong = this.playSong.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.seek = this.seek.bind(this);
    this.step = this.step.bind(this);
  }

  playSong(song) {
    this.stop();

    log.debug('Start to playing song ' + song.name);

    this.setState({state: 'loading'});

    let howl = new window.Howl({
      src: [song.streamUrl],
      html5: true,
      onload: () => this.setState({state: 'playing'}),
      onplay: () => {
        this.setState({state: 'playing'})
        requestAnimationFrame(this.step);
      },
      onstop: () => this.setState({state: 'stopped'}),
      onpause: () => this.setState({state: 'pause'}),
    });

    howl.play();

    this.setState({song, howl, state: 'loading'});
  }

  play() {
    let {howl} = this.state;

    if (is_defined(howl)) {
      howl.play();
    }
  }

  pause() {
    let {howl} = this.state;

    if (is_defined(howl)) {
      howl.pause();
    }
  }

  stop() {
    let {howl} = this.state;

    if (is_defined(howl)) {
      howl.stop();
    }
  }

  previous() {
  }

  next () {
  }

  seek(event) {
    let {howl} = this.state;

    if (is_defined(howl)) {
      let percent = event.clientX / window.innerWidth;
      howl.seek(howl.duration() * percent);
    }
  }

  step() {
    // Get the Howl we want to manipulate.
    let {howl} = this.state;

    if (is_defined(howl) && has_value(this.timer) && has_value(this.progress)) {
      // Determine our current seek position.
      let seek = howl.seek() || 0;
      this.timer.innerHTML = format_time(Math.round(seek));
      this.progress.style.width = (((seek / howl.duration()) * 100) || 0) + '%';

      // If the sound is still playing, continue stepping.
      if (howl.playing()) {
        requestAnimationFrame(this.step);
      }
    }
  }

  render() {
    let {song, howl, state, has_next, has_previous} = this.state;
    let duration = is_defined(howl) ? howl.duration() : '0:00';
    return (
      <Layout flex="column" align="space-between" className="player">
        <Layout flex align="space-between" className="title">
          <span className="timer" ref={ref => this.timer = ref}>
          </span>
          <span className="track">{song.name}</span>
          <span className="duration">
            {(state === 'playing' || state === 'pause' || state === 'stoped') &&
              format_time(duration)
            }
          </span>
        </Layout>

        {/* <div id="waveform"></div> */}
        {/* <div id="bar"></div> */}
        {(state === 'pause' || state === 'stopped' || state === 'playing') &&
          <div className="progress-wrapper" onClick={this.seek}>
            <div className="progress" ref={ref => this.progress = ref}></div>
          </div>
        }

        {state === 'loading' &&
          <Spinner color="white"/>
        }

        <div className="controlsOuter">
          <div className="controlsInner">
            {(state === 'pause' || state === 'stopped') &&
              <IconButton onClick={this.play}
                iconStyle={style.mediumIcon}
                style={style.medium}>
                <PlayArrow color="white"/>
              </IconButton>
            }
            {state === 'playing' &&
              <IconButton onClick={this.pause}
                iconStyle={style.mediumIcon}
                style={style.medium}>
                <Pause color="white"/>
              </IconButton>
            }
            {has_previous &&
              <IconButton onClick={this.previous}>
                <SkipPrevious color="white"/>
              </IconButton>
            }
            {has_next &&
              <IconButton onClick={this.next}>
                <SkipNext color="white"/>
              </IconButton>
            }
          </div>
          <div className="btn" id="playlistBtn"></div>
          <div className="btn" id="volumeBtn"></div>
        </div>

        {/* <div id="volume" className="fadeout"> */}
        {/*   <div id="barFull" className="bar"></div> */}
        {/*   <div id="barEmpty" className="bar"></div> */}
        {/*   <div id="sliderBtn"></div> */}
        {/* </div> */}
      </Layout>
    );
  }
}

export default Player;

// vim: set ts=2 sw=2 tw=80:
