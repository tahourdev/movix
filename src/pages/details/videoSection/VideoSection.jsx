import React, { useState } from 'react';

import './styles.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { PlayIcon } from '../PlayIcon';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Img from '../../../components/lazyLoadImage/Img';

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className='skItem'>
        <div className='thumb skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    );
  };

  return (
    <div className='videosSection'>
      <ContentWrapper>
        <div className='sectionHeading'>Official Videos</div>
        {!loading ? (
          <div className='videos'>
            {data?.results.map((video) => {
              return <div key={video.id} className='videoItem'></div>;
            })}
          </div>
        ) : (
          <div className='videoSkeleton'>
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
    </div>
  );
};

export default VideosSection;
