import React from 'react';
import VideoPlayer from 'react-player';

import './styles.scss';

export default class Videojs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: 'http://www.example.com/path/to/video_poster.jpg',
      playing: false,
    };
  }
  onVideoRef = (player) => {
    this.props.onModalClose(player);
    this.video = player;
    console.log(player);
  };

  pauseVideo = () => {
    this.setState({
      playing: false,
    });
  };

  playVideo = () => {
    this.setState({
      playing: true,
    });
  };

  componentWillUnmount() {
    console.log('unmount');
    this.setState({
      playing: false,
    });
  }

  render() {
    const { src, poster, playing } = this.state;
    const { className, setVisible, visible, id } = this.props;
    console.log(visible, 'visible');
    return (
      <>
        <VideoPlayer
          url='https://youtu.be/qgdfBnOQAkg'
          poster={poster}
          className={className}
          ref={this.onVideoRef}
          // onPause={onVideoPause}
          onPause={this.pauseVideo}
          onPlay={this.playVideo}
          playing={playing}
          controls={true}
        />
      </>
    );
  }
}

// const Videojs = ({  }) => {
//   console.log('visible', visible);
//   const player = null;

//   const onVideoRef = (player) => {
//     console.log(player, '==');
//     player = player;
//   };
//   // const onVideoPlay = () => {
//   //   videoRef.pause();
//   // };

//   const onVideoPause = (p) => {
//     console.log('Video paused at: ', player);
//     // onPause()
//     player.player.on();
//   };
//   // const onPlayerReady = () => {
//   //   console.log('Player is paused video: ');
//   // };
// };

// export default Videojs;

// import React from 'react';
// import videojs from 'video.js';

// export default class VideoPlayer extends React.Component {
//   componentDidMount() {
//     // const { onReady, ...options } = this.props;
//     // this.player = videojs(this.videoNode, options, onReady);
//     // instantiate Video.js
//     this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
//       console.log('componentDidMount', this);
//     });
//   }

//   // destroy player on unmount
//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }

//   render() {
//     return (
//       <div>
//         {/* <button onClick={this.player.onPlay()}>Play</button> */}
//         <div data-vjs-player>
//           <video
//             onClick={this.paused ? this.player() : this.paused}
//             ref={(node) => (this.videoNode = node)}
//             className={this.props.className}
//           ></video>
//         </div>
//       </div>
//     );
//   }
// }
// // VideoPlayer.propTypes = {
// //   onReady: PropTypes.func,
// // };

// // VideoPlayer.defaultProps = {
// //   onReady: noop,
// // };
