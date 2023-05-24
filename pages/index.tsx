import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import Link from 'next/link';

const POST_PER_PAGE = 10

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string) || 1;  // Default to page 1 if no page parameter is provided
  const perPage = POST_PER_PAGE;
  const skip = (page - 1) * perPage;

  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    skip,
    take: perPage,
  });

  return {
    props: { feed, page },
  };
};


type Props = {
  feed: PostProps[];
  page: number;
};

const Blog: React.FC<Props> = (props) => {
  const { feed, page } = props;

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
        <div className="pagination">
          {page > 1 && (
            <Link href={`/?page=${page - 1}`}>
              &larr; Previous Page
            </Link>
          )}  
          {feed.length === POST_PER_PAGE && (
            <Link href={`/?page=${page + 1}`}>
              Next Page &rarr;
            </Link>
          )}
        </div>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }

        .pagination {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </Layout>
  );
};


export default Blog;
