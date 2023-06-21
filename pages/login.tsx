import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useAuthContext } from "../components/AuthContext";
import jwt, { JwtPayload } from "jsonwebtoken";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthContext();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch(`/api/auth/authHandler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const { token } = await response.json();
        
        localStorage.setItem("token", token); // Store the token in local storage or a secure cookie

        const decodedToken = jwt.decode(token) as JwtPayload | null;

        if (decodedToken) {
          const user = {
            name: decodedToken?.username,
            email: decodedToken?.email,
            token: token,
          };
          setUser(user);
        }

        await Router.push("/");
      } else {
        const data = await response.json();
        alert(data.message);  
      }
      
    } catch (error) {
      console.error(error);
    }
};

  return (
    <Layout>
      <div className="login-box">
        <form onSubmit={submitData}>
          <h1>Log in</h1>
          <label>Email:</label>
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            type="text"
            value={email}
          />
        <label>Password:</label>
        <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            type="password"
            value={password}
          />
          <input disabled={!email || !password} type="submit" value="Login" />
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

        input[type="text"], input[type="password"],
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

export default Login;
