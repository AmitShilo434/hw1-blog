import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  
  return (
    <div>
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <style jsx>{`
        video {
          background: rgba(120, 120, 120, 0.1);
          transition: box-shadow 0.1s ease-in;
          padding: 0.5rem;
          margin: 0.5rem;
          max-width: 500px;
        }

        video:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;