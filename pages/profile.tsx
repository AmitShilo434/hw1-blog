import React from "react";
import Layout from "../components/Layout";
import { useAuthContext } from '../components/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <div className="profile-box">
        <h1>My Profile</h1>
        {user && (
          <>
            <div>
                <p>
                    <strong>Name:</strong> {user.name}
                </p>
            </div>
            <div>
            <p>
              <strong>Email:</strong> {user.email}
              </p>
            </div>
            {/* {user.profileImage && (
              <div>
                <img src={user.profileImage} alt="Profile" />
              </div>
            )} */}
          </>
        )}
      </div>
      <style jsx>{`
        .profile-box {
          background: white;
          max-width: 350px;
          padding: 3rem;
          margin: auto;
          border-radius: 0.5rem;
          border: 0.25rem solid rgba(0, 0, 0, 0.1);
        }

        .profile-box h1 {
            margin-bottom: 40px;
          }

        .profile-box strong {
            margin-right: 20px;
          }
      `}</style>
    </Layout>
  );
};

export default Profile;
