import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  // const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // const body = { title, content, session, email };
      const formData = new FormData();

      await fetch(`/api/post`, {
        method: 'POST',
        body: formData,
      });

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
};

  return (
    <Layout>
      <div className="login-box">
        <form onSubmit={submitData}>
          <h1>Sign up</h1>
          <label>Username:</label>
          <input
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            placeholder=""
            type="text"
            value={username}
          />
        <label>Email:</label>
        <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            type="email"
            value={email}
          />
          <label>Password:</label>
        <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            type="password"
            value={password}
          />
          <label>Verify password:</label>
        <input
            onChange={(e) => setRePassword(e.target.value)}
            placeholder=""
            type="password"
            value={rePassword}
          />
          <input disabled={!username || !password} type="submit" value="Login" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or go back
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

        .login-box {
            background: white;
            max-width: 350px;
            padding: 3rem;
            margin: auto;
            border-radius: 0.5rem;
            border: 0.25rem solid rgba(0, 0, 0, 0.1);
        }

        input[type="text"], input[type="password"], input[type="email"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          margin-top: 1.5rem;
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
