import React from "react";
import HomePageBanner from "./home-banner";
import HomeStockStrip from "./home-stock-strip";
import HomePageNews from "./home-news";

const HomeComponent = () => {
  return (
    <>
      <HomePageBanner />
      <HomeStockStrip />
      <div className="container">
        <HomePageNews />
      </div>
    </>
  );
};

export default HomeComponent;
