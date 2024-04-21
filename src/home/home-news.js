import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../news/news-item";
import {
  getNewsThunk,
  getRecommendedNewsThunk,
} from "./../services/news-thunks";
import { getAllUsersThunk, deleteUserThunk } from "./../services/user-thunks";

const HomePageNews = () => {
  const { news, recommendedNews, loadingNews, loadingRecs } = useSelector(
    (state) => state.news
  );
  const { user, loggedIn, allUsers, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsThunk());
    if (loggedIn && user.role === "TRADER") {
      dispatch(getRecommendedNewsThunk("AAPL"));
    } else if (loggedIn && user.role === "ADMIN") {
      dispatch(getAllUsersThunk());
    } else if (loggedIn && user.role === "INDUSTRY") {
      dispatch(getRecommendedNewsThunk(user.username));
    }
  }, []);

  const handleUserDelete = (userId) => {
    dispatch(deleteUserThunk(userId));
  };

  return (
    <>
      {loggedIn && user.role === "TRADER" && (
        <>
          <h2 className="mt-2">Recommended For You: </h2>
          <div className="list-group m-4">
            {loadingRecs && <div className="list-group-item">Loading...</div>}
            {recommendedNews.map((n) => {
              if (n.banner_image) return <NewsItem news={n} />;
            })}
          </div>
          <h2 className="mt-2">Trending Today: </h2>
          <div className="list-group m-4">
            {loadingNews && <div className="list-group-item">Loading...</div>}
            {news.map((n) => {
              if (n.banner_image) return <NewsItem news={n} />;
            })}
          </div>
        </>
      )}
      {loggedIn && user.role === "INDUSTRY" && (
        <>
          <h2 className="mt-2">You may be interested in: </h2>
          <div className="list-group m-4">
            {loadingRecs && <div className="list-group-item">Loading...</div>}
            {recommendedNews.map((n) => {
              if (n.banner_image) return <NewsItem news={n} />;
            })}
          </div>
        </>
      )}

      {loggedIn && user.role === "ADMIN" && (
        <>
          <h2 className="mt-2">All existing Users: </h2>
          <div className="list-group m-4">
            {loading && <div className="list-group-item">Loading...</div>}
            {console.log(allUsers)}
            {allUsers &&
              allUsers.map((user) => {
                if (user.role !== "ADMIN") {
                  return (
                    <div
                      class="list-group-item row"
                      style={{ display: "flex" }}
                    >
                      <div class="col-md-9 col-sm-12">
                        <small className="text-secondary">{user.role}</small>
                        <div>
                          <b>{user.username}</b>
                        </div>
                        <div>{user.email}</div>
                      </div>
                      <div class="col-md-3 col-sm-12 text-center">
                        <button
                          class="btn btn-danger"
                          onClick={() => handleUserDelete(user._id)}
                        >
                          Delete User
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </>
      )}

      {user.role === "ANONYMOUS" && (
        <>
          <h2 className="mt-2">Trending Today: </h2>
          <div className="list-group m-4">
            {loadingNews && <div className="list-group-item">Loading...</div>}
            {news.map((n) => {
              if (n.banner_image) return <NewsItem news={n} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default HomePageNews;
