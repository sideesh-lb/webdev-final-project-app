import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import HomeComponent from "./home";
import NavigationComponent from "./navigation";
import newsReducer from "./reducers/news-reducer";
import stockReducer from "./reducers/stocks-reducer";
import userReducer from "./reducers/user-reducer";
import bookmarksReducer from "./reducers/bookmark-reducer";
import Footer from "./navigation/footer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup";
import UserDetails from "./pages/dashboard";
import EditProfile from "./pages/editProfile";
import ProfileComponent from "./profile";
import Bookmarks from "./bookmarks";
import ProfileComponentAdmin from "./profile/profilepages/admin";
import ProfileComponentCompany from "./profile/profilepages/comapny";
import Search from "./search";
import SearchDetails from "./searchDetails";
import searchReducer from "./search/search-reducer";
import commentReducer from "./reducers/comment-reducer";
import likeReducer from "./reducers/like-reducer";
import stocksReducer from "./reducers/stock-reducer";
import PublicProfile from "./profile/publicProfile";

const store = configureStore({
  reducer: {
    news: newsReducer,
    stockdata: stockReducer,
    user: userReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer,
    comments: commentReducer,
    likes: likeReducer,
    stocks: stocksReducer
  },
});

function App() {
  const user = localStorage.getItem("token");


  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <NavigationComponent />
          <div id="mainContainer">
            <Routes>
              <Route path="/*" element={<HomeComponent />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="profile" element={<ProfileComponent />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="/profileadmin" element={<ProfileComponentAdmin/>}/>
              <Route path="/profilecompany" element={<ProfileComponentCompany/>}/>
              <Route path="/profile/:uid" element={<PublicProfile/>}/>
              {user && <Route path="/userDetails" element={<UserDetails />} />}
              {user && <Route path="/editProfile" element={<EditProfile />} />}
              <Route path="/search" element={<Search/>}/>
              <Route path="/search-details" element={<SearchDetails/>}/>
            </Routes>
          </div>
          <Footer />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;