import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Profile: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // If the token exists, fetch user information
    if (token) {
      fetchUserInfo(token);
    } else {
      // Redirect the user to the login page if the token is not found
      Router.push("/login");
    }
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      // Make an API call to fetch user information
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Redirect the user to the login page if the token is invalid or expired
        Router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1>Welcome, {user?.name}</h1>
      </div>
    </Layout>
  );
};

export default Profile;
