import { createSlice } from "@reduxjs/toolkit";
import { getAllBookMarksThunk, deleteBookmarkThunk } from "./../services/bookmark-thunks";

const initialBookmarks= {
    bookmarks :[]
};


const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: initialBookmarks,
  reducers: {

    addBookmark(state, action) {
      console.log("BOOKMARK IMAGE ===> ", action.payload.bookmark.banner_image);
      state.bookmarks.push({
        userEmail: action.payload.userEmail,
        bannerImage : action.payload.bookmark.banner_image,
        title:action.payload.bookmark.title,
        source:action.payload.bookmark.source,
        summary:action.payload.bookmark.summary,
        url:action.payload.bookmark.url
      });
    },
    deleteBookmark(state, action) {
      const index = action.payload
      console.log(index);
      state.bookmarks.splice(index, 1)
    },

    // todoDoneToggle(state, action) {
    //   const todo = state.find((todo) =>
    //         todo._id === action.payload._id)
    //   todo.done = !todo.done
    // }
  },

    extraReducers: {
        // [getAllBookMarksThunk.pending]: (state) => {
        //     console.log("huhuhuh")
        //   state.loadingBookmarks = true;
        //   state.bookmarks = [];
        // },
        [getAllBookMarksThunk.fulfilled]: (state, { payload }) => {
        
          state.bookmarks = payload.bookMarksForUser;
          console.log(state);
          
        }, 
          [deleteBookmarkThunk.fulfilled]: (state, { payload }) => {

            state.bookmarks = state.bookmarks.filter((u) => u.url !== payload);
          },
    }

});

export const {
  addBookmark,
  deleteBookmark,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
// const initialBookmarks = [
//     {
//         userEmail: "nandynandy@gmail.com",
//         bannerImage: "https://cdn.benzinga.com/files/images/story/2022/12/15/25.png?width=1200&height=800&fit=crop",
//         title: "What's Going On With Apple Shares - Apple  ( NASDAQ:AAPL ) ",
//         source: "Benzinga",
//         summary: "Shares of several companies in the broader tech sector, including Apple Inc AAPL, are trading lower going into the close of Thursday's session amid overall market weakness following Thursday's Fed decision to raise interest rates by 50 basis points.",
//         url: "https://www.benzinga.com/trading-ideas/movers/22/12/30099427/whats-going-on-with-apple-shares"
//     }
//    ];
   
// const bookmarksSlice = createSlice({
//     name: 'bookmarks',
//     initialState: initialBookmarks,
//     reducers: {
//         addBookmark(state, action) {
//             state.push({
//                 userEmail: action.payload.userEmail,
//                 bannerImage: action.payload.bookmark.bannerImage,
//                 title: action.payload.bookmark.title,
//                 source: action.payload.bookmark.source,
//                 summary: action.payload.bookmark.summary,
//                 url: action.payload.bookmark.url
//             });
//         },
//     }
// });
// export const { addBookmark } = bookmarksSlice.actions;
// export default bookmarksSlice.reducer;

