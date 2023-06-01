import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  videoUrl: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (post.videoUrl) {
        try {
          const response = await fetch(`/api/video/${post.videoUrl}`);
          const data = await response.json();
          console.log("setVideoUrl with", data)
          setVideoUrl(data);
        } catch (error) {
          console.error('Error fetching video URL:', error);
        }
      }
    };

    fetchVideoUrl();
  }, [post.videoUrl]);

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
