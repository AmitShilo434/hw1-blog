import { useState, useEffect } from 'react';

const VideoItem = () => {
  const [videoUrlPromise, setVideoUrlPromise] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (videoUrlPromise) {
      videoUrlPromise.then((result) => {
        setVideoUrl(result);
      }).catch((error) => {
        console.error('Error fetching video URL:', error);
      });
    }
  }, [videoUrlPromise]);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch('/api/video/:id');
        const data = await response.json();
        setVideoUrlPromise(Promise.resolve(data));
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, []);

  return (
    <div>
      <h1>Video Page</h1>
      {videoUrl ? (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoItem;