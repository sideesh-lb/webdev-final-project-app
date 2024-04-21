import React, {useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import HomeStockStrip from "../home/home-stock-strip";
import StockStats from "./stock-stats";
import { profile } from "../services/user-service";
import StockComments from "./StockComments";
import {
  createCommentThunk,
  findCommentsThunk,
  resetCommentsThunk,
} from "../services/comments/comment-thunk";
import {
  getStockDetailsThunk,
  resetStockDetailsThunk,
} from "../services/stock-thunks";
import { findAllStocksLikedByUser } from "../services/likes/like-service";

const SearchDetails = () => {
  const { state } = useLocation();
  //console.log("Parameters recevied :", state.stockDetails);

  const stock = useMemo(() => {
    return state.stockDetails;
  }, [state])
  const { user, loggedIn } = useSelector((state) => state.user);
  const { currentStockDetails } = useSelector((state) => state.stockdata);
  console.log("=====>>>>Currently logged in user is :", user);
  // const { currentStockId } = useSelector((state) => state.stocks);
  const currentStockId = useMemo(() => {
    return stock._id;
  }, [stock]);
  const navigate = useNavigate();

  //Load comments from store
  const { comments } = useSelector((state) => state.comments);
  console.log("From store ---- Comments :", comments);
  let [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  // Add a new comment
  const newCommentHandler = () => {
    const newCommentBody = {
      stockID: currentStockId,
      comment: newComment,
      postedBy: user._id,
    };
    dispatch(createCommentThunk(newCommentBody));
  };

  useEffect(() => {
    console.log("stock: ", stock);
    console.log("currentStockId: ", currentStockId);
    dispatch(resetCommentsThunk());
    if (currentStockId) {
      console.log("Reached. Going to dispatch comments! ", currentStockId);
      dispatch(findCommentsThunk(currentStockId));
    }
  }, []);

  useEffect(() => {
    dispatch(resetStockDetailsThunk());
    dispatch(getStockDetailsThunk(stock.symbol));
    if (user) {
      console.log("inside useEffect : User is ", user);
    } else {
      navigate("/sign-in");
    }
  }, []);
  /*const logout = () => {
        service.logout()
            .then(() => navigate('/login'));
    }
*/
  // Formatting data
  /*const artists = song.artists.join(', ')
    const minutes = Math.floor(song.songDurationInMs / 60000);
    const seconds = ((song.songDurationInMs % 60000) / 1000).toFixed(0);
    const duration = minutes + ":" + (seΩconds < 10 ? '0' : '') + seconds;
    const releaseYear = dateFormat(song.releaseYear+"T08:59:00.000Z", "mmmm dS, yyyy")*/

  return (
    <div>
      <HomeStockStrip />
      <div className="container">
        <Link to="/search" className="text-decoration-none">
          &lt; Back to search results
        </Link>
        <div className="mb-2 position-relative"></div>
        <h2 className="fw-bolder">
          {stock.instrument_name} ({stock.symbol})
        </h2>
        <div>
          <div className="pt-0">
            <span className="h6 text-secondary mb-1">{stock.exchange} </span>
          </div>
          {console.log("Current stock details: ", currentStockDetails)}
          {currentStockDetails !== null && (
            <div>
              <div className="text-secondary">
                {currentStockDetails.companySummary.country} |
                <a
                  href={currentStockDetails.companySummary.website}
                  className="text-secondary ms-2"
                  target="_blank"
                >
                  {currentStockDetails.companySummary.website}
                </a>
              </div>
              <h2>
                {currentStockDetails.price.marketPrice}
                {currentStockDetails.price.marketChange >= 0 && (
                  <span className="h4 text-success ms-2">
                    {currentStockDetails.price.marketChange} (
                    {currentStockDetails.price.marketChangePerc})
                  </span>
                )}
                {currentStockDetails.price.marketChange < 0 && (
                  <span className="h4 text-danger ms-2">
                    {currentStockDetails.price.marketChange} (
                    {currentStockDetails.price.marketChangePerc})
                  </span>
                )}
              </h2>
              <table class="table border">
                <tbody>
                  <tr>
                    <th scope="row">Market Price:</th>
                    <td>{currentStockDetails.price.marketPrice}</td>
                  </tr>
                  <tr>
                    <th scope="row">Market Open:</th>
                    <td>{currentStockDetails.price.marketOpen}</td>
                  </tr>
                  <tr>
                    <th scope="row">Prev. Market Close: </th>
                    <td>{currentStockDetails.price.marketClose}</td>
                  </tr>
                  <tr>
                    <th scope="row">Market High: </th>
                    <td>{currentStockDetails.price.marketHigh}</td>
                  </tr>
                  <tr>
                    <th scope="row">Market Low: </th>
                    <td>{currentStockDetails.price.marketLow}</td>
                  </tr>
                  <tr>
                    <th scope="row">Market Change: </th>
                    <td>{currentStockDetails.price.marketChange}</td>
                  </tr>
                  <tr>
                    <th scope="row">Market Change Percent: </th>
                    <td>{currentStockDetails.price.marketChangePerc}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-secondary">
                {currentStockDetails.companySummary.longBusinessSummary}
              </p>
            </div>
          )}
          <hr />
          {console.log("Current stock id", currentStockId)}
          {currentStockId && (
            <StockStats
              newComment={newComment}
              setNewComment={setNewComment}
              newCommentHandler={newCommentHandler}
              stockID={currentStockId}
            />
          )}
          <hr />
        </div>
        {comments.length > 0 && (
          <div>
            <div className="wd-grey-text h6 mb-3">Comments</div>
            <ul className="list-group mb-4">
              {currentStockId &&
                comments.map((comment, index) => (
                  <StockComments
                    key={comment._id}
                    comment={comment}
                    userID={"me"}
                    user={user}
                  />
                ))}
            </ul>
          </div>
        )}
        {/* {comments.length === 0 && (
          <div>
            <div className="wd-grey-text">No comments</div>
          </div>
        )} */}
        {/*<button
                    className="btn btn-primary text-white mt-3"
                    type="button"
                    onClick={logout}>
                    Logout
                </button>*/}
      </div>
    </div>
  );
};
export default SearchDetails;
