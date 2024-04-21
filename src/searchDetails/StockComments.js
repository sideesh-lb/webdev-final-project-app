import React, { useState } from "react";
import {
  deleteCommentThunk,
  updateCommentThunk,
} from "../services/comments/comment-thunk";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";

const StockComments = ({ comment, userID, user }) => {
  const [editMode, setEditMode] = useState(false);
  const commentID = String(comment._id);

  const [edit, setEdit] = useState({ comment: comment });

  const commentDate = comment.postedOn.split("T")[0];

  const dispatch = useDispatch();
  const deleteCommentHandler = () => {
    dispatch(deleteCommentThunk({ userID, commentID }));
  };

  const editCommentChangeHandler = async (event) => {
    let editValue = event.target.value;
    const newEdit = {
      comment: {
        ...edit.comment,
        comment: editValue,
      },
    };
    await setEdit(newEdit);
  };

  const updateCommentHandler = () => {
    setEditMode(!editMode);
    const commentObject = edit.comment;
    dispatch(updateCommentThunk({ userID, commentID, commentObject }));
  };
  console.log("===>COMMENT OBJECT", comment);
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-10">

            {!comment.postedBy.username && (
                <Link to={`/profile/${user._id}`} key={user._id} >
                <b className="wd-float-left me-2">{user.username}</b>
                </Link>
            )}

          {comment.postedBy.username && (
              <Link to={`/profile/${comment.postedBy._id}`} key={user._id}>
                <b className="wd-float-left me-2">{comment.postedBy.username}</b>
              </Link>
          )}


          <span className="wd-float-left wd-grey-text wd-post-summary-spacing text-secondary">
            • {commentDate}
          </span>
        </div>
        {user.username === comment.postedBy.username && (
          <>
            <div className="col-1 text-end">
              <button
                className="bi bi-pencil-fill"
                onClick={() => setEditMode(!editMode)}
              ></button>
            </div>
            <div className="col-1 text-start">
              <button
                className="bi bi-trash3-fill"
                onClick={deleteCommentHandler}
              ></button>
            </div>
          </>
        )}
      </div>
      <div className="row mt-2">
        <div className="col-12">
          {!editMode && comment.comment}
          {editMode && (
            <div className="input-group mt-2">
              <input
                type="text"
                defaultValue={comment.comment}
                onChange={editCommentChangeHandler}
                className="form-control me-3"
                aria-label="With textarea"
              ></input>
              <button
                className="btn btn-info"
                type="button"
                id="button-addon2"
                onClick={updateCommentHandler}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="wd-float-done"></div>
    </li>
  );
};
export default StockComments;
