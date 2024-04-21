import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockDataThunk } from "./../services/stock-thunks";
import StockTickerItem from "./stock-ticker-item";

const HomeStockStrip = () => {
  const { stockdata, loading } = useSelector((state) => state.stockdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockDataThunk());
  }, []);

  return (
    <div className="wd-inner">
      <div className="wd-wrapper">
        <div class="border m-2 wd-stock-tickers">
          {stockdata.map((quote) => (
            <>
              <StockTickerItem quote={quote} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeStockStrip;
