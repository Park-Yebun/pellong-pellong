import React from 'react';
import { Link, useParams } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';

const ShadowingPlayPage = () => {
  const { 'video-id': videoId } = useParams();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      cc_load_policy: 1,
      controls: 0,
      enablejsapi: 1,
      origin,
      rel: 0
    },
  };


  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      <div>
        
      </div>
      <div>
    
      </div>
    </div>
  );
};

export default ShadowingPlayPage;
