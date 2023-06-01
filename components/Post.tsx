import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

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
  const videoUrl = post.videoUrl ? post.videoUrl : "Unknown video";

  // if(post.videoUrl) {
  //   VideoMD.findById(post.videoUrl, (err: any, item: any) => {
  //     if (err) {
  //       console.error('Error finding item:', err);
  //     } else {
  //       console.log('Item found:', item);
  //     }
  //   });
  // }

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <small>By {videoUrl}</small>
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
