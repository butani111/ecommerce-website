import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthorizedUser } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthorizedUser === false) {
      history.push("/login");
    }
  }, [isAuthorizedUser, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profile-container">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h5>Full Name</h5>
                <p>{user.name}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{user.email}</p>
              </div>
              <div>
                <h5>Joined On</h5>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
