import React from "react";

const StockTickerItem = ({ quote }) => {
  return (
    <div className="wd-stock row border-end m-2">
      <div className="col-2">
        {quote.regularMarketChange < 0 && (
          <i class="bi bi-arrow-down-left-square-fill text-danger fs-2"></i>
        )}
        {quote.regularMarketChange >= 0 && (
          <i class="bi bi-arrow-up-right-square-fill text-success fs-2"></i>
        )}
      </div>
      <div className="col-10">
        <div>
          <b>{quote.shortName}</b>
        </div>
        <div>{quote.regularMarketPrice.toFixed(2)}</div>
        <div
          className={`${
            quote.regularMarketChange < 0 ? "text-danger" : "text-success"
          }`}
        >
          {quote.regularMarketChange.toFixed(2)} (
          {quote.regularMarketChangePercent.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default StockTickerItem;
