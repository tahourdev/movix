import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

import './styles.scss';
import { useNavigate, useParams } from 'react-router-dom';

const VideoPopup = ({ show, setShow, videoId, setVideoId, videoType, setVideoType, loading }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
    setVideoType(null);
  };

  return (
    <div className={`videoPopup ${show ? 'visible' : ''}`}>
      <div className='opacityLayer' onClick={hidePopup}></div>
      <div className='videoPlayer'>
        <span className='closeBtn' onClick={hidePopup}>
          Close
        </span>
        {/* <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width='100%'
          height='100%'
          // playing={true}
        /> */}

        <iframe
          title='Full Video'
          src={`https://vidsrc.net/embed/${videoType}?tmdb=${videoId}`} // Use curly braces to interpolate the variable
          style={{ width: '100%', height: '100%' }} // Use double curly braces for inline styles
          frameBorder='0'
          referrerPolicy='origin'
          allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default VideoPopup;
