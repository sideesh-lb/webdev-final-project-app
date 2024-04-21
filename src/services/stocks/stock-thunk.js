import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllStocks, createStock, deleteStock} from "./stock-service";

export const createStocksThunk = createAsyncThunk(
    'createStock',
    async (newStock) => {
        if(!newStock._id) {
            return await createStock(newStock);
        }
        return newStock;
    }
);


export const navigateStockAndNavigate = (newStock, navigate) => {
    return async (dispatch) => {
        console.log("Reached Cretae stock thunk", newStock, navigate)
        const stock = await createStock(newStock)
        console.log("Reached Cretae stock thunk, created :", stock)
        navigate("/search-details", {
            state: { stockDetails:  { ...newStock, ...stock} },
        });
        dispatch(createStocksThunk(stock));
    }
}

export const findAllStocksThunk = createAsyncThunk(
    'findAllStocks',
    () => findAllStocks()
)

export const updateStockThunk = {}
export const deleteStockThunk = createAsyncThunk(
    'deleteStock',
    (sid) => deleteStock(sid)
)