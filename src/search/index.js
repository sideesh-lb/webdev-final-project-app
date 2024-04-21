import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import NavigationComponent from "../navigation";
import { findStockBySearchTermThunk } from "../services/search/search-thunk";
import HomeStockStrip from "../home/home-stock-strip";
import {navigateStockAndNavigate} from "../services/stocks/stock-thunk";
import { createStock } from "../services/stocks/stock-service";

const Search = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { search } = useSelector((state) => state.search);
  console.log(" Searched Stocks are : ", search);
  const dispatch = useDispatch();
  const searchForStock = () => {
    dispatch(findStockBySearchTermThunk(title));
  };
  return (
    <div>
      <HomeStockStrip />
      <div className="container">
        <div className="text-center mb-3">
          <h1>Search for Industries</h1>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-4">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder={"Stock Symbol"}
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <button onClick={searchForStock} className="btn btn-info">
                Search
              </button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="row">
          <div className="col results-spacing">
            <ul className="list-group">
              {search &&
                search.map(function (searchedStock) {
                  return (
                    <li className="list-group-item ">
                      <div className="card album-artwork">
                        <div className="card">
                          <div className="card-body">
                            <h5
                              onClick={() => {
                                dispatch(navigateStockAndNavigate(searchedStock, navigate));
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {searchedStock.instrument_name}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              {search && search.length === 0 && (
                <h4 className="mt-2"> No Results. </h4>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
