import { React, useState, useEffect } from "react";
import { useSelector, useDispatch,useStore } from "react-redux";
import { addBookMark, deleteBookMark } from "../services/bookmark-service";
import {
  addBookmark,
  deleteBookmark
} from "../reducers/bookmark-reducer";

import { Await } from "react-router";
const NewsItem = ({ news }) => {
  const store = useStore();
 

 
  const bookmarks = store.getState().bookmarks.bookmarks;
  const { user, loggedIn } = useSelector((state) => state.user);

  
   
  const [bookmark, setBookmark] = useState({bookmark: news});
  const dispatch = useDispatch();
  const index =  store.getState().bookmarks.bookmarks.findIndex(item=>news.url === item.url);
  const [bookMarked, setBookMark] = useState(index !==-1);
  const createBookmarkClickHandler = (event) => {


 
 setBookMark(!bookMarked);
 console.log(bookMarked);
      if(index !== -1) {
        console.log("item present");
        dispatch(deleteBookmark(index));
        console.log(store.getState().bookmarks.bookmarks);
        deleteBookMark(user.email, news.url).then((res) => {
          if (res.message === "bookMark Deleted!") {
            alert("Bookmark Deleted!")
          } else {
            alert("Bookmark not Deleted!");
          }
        });
      } else {
        console.log("item not present");
        const newBookmark = {
          userEmaill: user.email,
      bookmark: news
    };
      setBookmark(newBookmark);
      dispatch(addBookmark(newBookmark));
      console.log(store.getState().bookmarks.bookmarks);
      addBookMark(user.email, news).then((res) => {
        if (res.message === "bookMark Added!") {
          alert("Bookmark Created!")
        } else {
          alert("Bookmark not created!");
        }
      });
      }

 
  }


  return (
    <div className="list-group-item mt-2">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img
            src={news.banner_image}
            alt={news.title}
            className="w-100 rounded"
            
          />
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="text-secondary">{news.source}</div>
          <div className="wd-text-bold wd-overflow-ellipsis">{news.title}</div>
          <p>{news.summary}</p>
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="float-end"
          >
            Read more
          </a>
          {loggedIn && user.role === "TRADER" && (
          <div
            class="bottom-0 mb-3 position-absolute"
            style={{ cursor: "pointer" }}
                onClick={createBookmarkClickHandler}
          >
            {bookMarked &&( 
            <>
            <i class="bi bi-bookmark-fill me-2" style={{color:"blue"}}></i>Bookmarked
            </>)
}
{!bookMarked &&(<>
            <i class="bi bi-bookmark me-2"></i>Bookmark
            </>)
}
          </div>
          )
          
}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
// function addingBookmark(){
  //   addBookMark(user.email,news).then((res) => {
  //     if (res.message === "Added Bookmark") {
  //       alert("Bookmark added!")
  //     } else {
  //       alert("Bookmark not added!");
  //     }
  //   });
  // }
  // // let [dob, setDateOfBirth] = useState({ dob: user.dob });
  
  
  // const dispatch = useDispatch();
  // const bookmarkChangeHandler =async(event) => {
  //   const index = bookmarks.findIndex(item=>
  //     {
  //       return news.url === item.url;
  //     });
  
  //   if(index !== -1) {
  //     bookmarks.splice(index, 1);
  //   } else {
  //     bookmarks.push(news);
  //   }
  //   console.log(bookmarks)
  //   setBookmarks(bookmarks);
    
 
   
  //   // dispatch(changeBookmarks(newBookmarks));
  // };

  // const u = useSelector(state => {
  //   console.log(state.user);
  //   return state.user.bookMarks;});
    // const newBookmark = {
  //   bookmark: news
  // };
  // setBookmark(newBookmark);
  
  // // console.log(bookmarks);
  // // const index =  user.bookMarks.findIndex(item=>news.url === item.url);
    
  // //     if(index !== -1) {
  // //       console.log("item present");
  // //       dispatch(deleteBookmark(index));
    
  // //     } else {
  // //       console.log("item not present");
  // //       dispatch(addBookmark(news));
  // //     }
  // dispatch(addBookmark(newBookmark));
  // console.log(bookmarks);
  