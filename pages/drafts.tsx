import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import { useAuthContext } from '../components/AuthContext';

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = () => {
  const { user } = useAuthContext();
  const [drafts, setDrafts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/drafts/${user.email}`);
        const data = await response.json();
        setDrafts(data.drafts);
      } catch (error) {
        console.error('Failed to fetch drafts:', error);
      }
    };

    fetchDrafts();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          margin-bottom: 2rem;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
