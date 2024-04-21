
import {createAsyncThunk} from "@reduxjs/toolkit";
import {findStockBySearchTerm} from "./search-service";

export const findStockBySearchTermThunk = createAsyncThunk(
    'findStockBySearchTerm',
    async (term) => await findStockBySearchTerm(term)
)
/*
export const findMovieByImdbIdThunk = createAsyncThunk(
    'findMovieByImdbId',
    (imdbID) => findMovieByImdbId(imdbID)
)*/
