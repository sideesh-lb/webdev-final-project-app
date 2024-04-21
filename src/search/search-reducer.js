import {createSlice} from "@reduxjs/toolkit";
import {findStockBySearchTerm} from "../services/search/search-service";
import {findStockBySearchTermThunk} from "../services/search/search-thunk";

const initialState = {
    search: [],
    loading: false,
}

const searchReducer = createSlice({
    name: 'search',
    initialState: initialState,
    extraReducers: {
        [findStockBySearchTermThunk.fulfilled]: (state, action) => {
            console.log("Inside the fulfilled in search reducer", action)
            state.loading = false
            state.search = action.payload
            console.log("State =>", action.payload[0])
        },
        [findStockBySearchTermThunk.pending]: (state, {payload}) => {
            console.log("Inside the pending in search reducer", payload)
            state.loading = true
            state.search = payload
        },
        [findStockBySearchTermThunk.rejected]: (state, action) => {
            console.log("Inside the rejected in search reducer", state, action.payload)
        }
    }
})

export default searchReducer.reducer