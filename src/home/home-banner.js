import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePageBanner = () => {
  const { user, loggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/sign-in");
  };

  return (
    <div className="wd-home-banner p-5">
      <div className="col-md-12 col-sm-12 text-center">
        {!loggedIn && (
          <>
            <h2 className="text-white">Start investing today!</h2>
            <button
              onClick={handleStart}
              className="btn btn-light rounded-pill mt-3 ps-4 pe-4 wd-color-blue"
            >
              Get Started
            </button>
          </>
        )}
        {loggedIn && (
          <>
            <h2 className="text-white">Welcome back, {user.username} </h2>
            {user.role === "TRADER" && (
              <p className="text-white">
                Look up your favorite companies and explore what others are up
                to...
              </p>
            )}
            {user.role === "INDUSTRY" && (
              <p className="text-white">
                Check out the latest market trend and news in your industry...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePageBanner;
