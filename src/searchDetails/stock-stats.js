import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countHowManyLikesThunk,
  findUserLikesStockThunk,
  toggleLikeThunk,
  resetLikesThunk,
} from "../services/likes/like-thunk";
import { countHowManyCommentsThunk } from "../services/comments/comment-thunk";
import { useNavigate } from "react-router-dom";

const StockStats = ({
  newComment,
  setNewComment,
  newCommentHandler,
  stockID,
}) => {
  const { user, loggedIn } = useSelector((state) => state.user);
  const [showCommentBox, setShowCommentBox] = useState(false);
  console.log("Inside the Stock Stats, checking which user :", user);
  const userId = user._id;
  const likesCount = useSelector((state) => state.likes.likes.count);
  const isStockLiked = useSelector((state) => state.likes.likes.userLiked);
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetLikesThunk());
    dispatch(countHowManyLikesThunk(stockID));
    dispatch(countHowManyCommentsThunk(stockID));
    dispatch(findUserLikesStockThunk({ userId, stockID }));
  }, []);

  console.log("likesCount", likesCount);

  const likeStock = (stockID) => {
    if (!loggedIn) {
      navigate("/sign-in");
      return;
    }
    console.log("inside like stock, user id", userId);
    console.log("inside like stock, stock id", stockID);
    dispatch(toggleLikeThunk({ userId, stockID }));
  };

  const showComment = () => {
    if (!loggedIn) {
      navigate("/sign-in");
      return;
    }
    setShowCommentBox(!showCommentBox);
  };

  return (
    <div>
      <div className="row wd-symbols">
        <div className="col-6 text-center">
          <button
            className={
              isStockLiked
                ? "bi bi-hand-thumbs-up-fill text-info wd-icon-button"
                : "bi bi-hand-thumbs-up wd-grey-text wd-heart wd-icon-button"
            }
            onClick={() => likeStock(stockID)}
          ></button>
          <span className="wd-icons-text ms-2">{likesCount}</span>
        </div>
        <div className="col-6 text-center">
          <button
            onClick={() => showComment()}
            className="fa-regular bi bi-chat wd-grey-text wd-icon-button"
          ></button>
          <span className="wd-icons-text ms-2">{comments.length}</span>
        </div>
      </div>

      {showCommentBox ? (
        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-6 mt-2">
            <input
              type="text"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              className="form-control"
              aria-label="With textarea"
              placeholder="Write a comment..."
            ></input>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-info mt-2"
              type="button"
              id="button-addon2"
              onClick={newCommentHandler}
            >
              Comment
            </button>
          </div>
          <div className="col-md-2"></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default StockStats;
