import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "../lib/auth-controller";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState("");
  // let email = session?.user?.email ?? ""; TODO
  let email = "session?.user?.email ?? ";

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, session, email };

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('session', JSON.stringify(session));
      formData.append('email', email);
      formData.append('video', selectedFile);

      await fetch(`/api/post`, {
        method: 'POST',
        body: formData,
      });

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
};

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          margin-top: 0.5rem;
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        input[type="file"] {
          width: 100%;
          background: white;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
