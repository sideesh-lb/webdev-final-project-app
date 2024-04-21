import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Bookmarks from "./bookmark-item";
import {
    getNewsThunk,
    getRecommendedNewsThunk,
} from "./../services/news-thunks";
import { getAllUsersThunk, deleteUserThunk } from "./../services/user-thunks";
import BookmarkItem from "./bookmark-item";
import { useNavigate } from "react-router";
const HomePageNews = () => {

    const { user, loggedIn, allUsers, loading } = useSelector(
        (state) => state.user
    );
    const store = useStore();
    const bookmarks = store.getState().bookmarks.bookmarks;
    console.log(bookmarks);

    const navigate = useNavigate();
    function goToProfile() {
        navigate("/profile");
    }

    return (
        <>
                <>
                    <div class="bookMarkPage">
                        <div class="row">

                            <div class="col-11">
                                <h1 style={{ color: "lightblue", textAlign: "center" }}>Your Bookmarks</h1>
                            </div>
                            <div class="col-1">
                                <i style={{ fontSize: "35px", color: "lightblue", cursor: "pointer" }} onClick={goToProfile} class="bi bi-person-circle "></i>

                            </div>
                        </div>
                        <div className="list-group m-4">
                            {bookmarks.map((n => 
                                  <BookmarkItem   key={n.userEmail} bookmarks={n} />
                            ))
                            }
                        </div>
                    </div>
                </>
            
        </>
    );
};

export default HomePageNews;
