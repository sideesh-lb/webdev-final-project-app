import {createSlice} from "@reduxjs/toolkit";
import {createStocksThunk, deleteStockThunk, findAllStockThunk} from "../services/stocks/stock-thunk";

const initialState = {
    stocks: [],
    currentStockId: "",
    loading: true
}

const stocksReducer = createSlice({
    name: 'stocks',
    initialState: initialState,
    extraReducers: {
        [createStocksThunk.fulfilled]: (state, action) => {
            state.stocks.push(action.payload)
            console.log("Inside thunk fulfilled :", action.payload._id)
            state.currentStockId = action.payload._id
        },
        [createStocksThunk.pending]: (state, action) => {
            console.log("CreateStocksThunk stil in pending state")
        },[createStocksThunk.rejected]: (state, action) => {
            console.log("CreateStocksThunk in rejected state: ", action)
        },
        [deleteStockThunk.fulfilled]: (state, action) => {
            // const midx = state.findIndex(m => m._id === action.payload)
            state.stocks = state.stocks.filter(s => {
                return s._id !== action.payload
            })
        }
    }
})

export default stocksReducer.reducer;