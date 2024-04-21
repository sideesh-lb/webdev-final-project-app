import { React, useState } from "react";
import { useSelector, useDispatch,useStore } from "react-redux";
import { deleteBookMark } from "../services/bookmark-service";
import {
  deleteBookmark
} from "../reducers/bookmark-reducer";
const BookmarkItem = ({ bookmarks }) => {
  const store = useStore();
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector((state) => state.user);
  const index =  store.getState().bookmarks.bookmarks.findIndex(item=>bookmarks.url === item.url);

 const [not_deleted, setNotDeleted] = useState(true);
  const deleteBookmarkClickHandler = (event) => {    
           console.log("item present");
           setNotDeleted(false);
           console.log(not_deleted);
           dispatch(deleteBookmark(index));
           console.log(store.getState().bookmarks.bookmarks);
           deleteBookMark(user.email, bookmarks.url).then((res) => {
             if (res.message === "bookMark Deleted!") {
               alert("Bookmark Deleted!")
             } else {
               alert("Bookmark not Deleted!");
             }
           });
     }
  return (
    <>
    {not_deleted && (
    <div className="list-group-item mt-2">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img
            src={bookmarks.bannerImage}
            alt={bookmarks.title}
            className="w-100 rounded"           
          />
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="text-secondary">{bookmarks.source}</div>
          <div className="wd-text-bold wd-overflow-ellipsis">{bookmarks.title}</div>
          <p>{bookmarks.summary}</p>
          
                        <button
                          class="btn btn-danger float-start"
                          onClick={deleteBookmarkClickHandler}

                        >
                          <i class="bi bi-trash"></i>
                        </button>
                     
          <a
            href={bookmarks.url}
            target="_blank"
            rel="noreferrer"
            className="float-end"
          >
            Read more
          </a>        
        </div>
      </div>
    </div>
   
  )}
  </>
  )
  
};

export default BookmarkItem;