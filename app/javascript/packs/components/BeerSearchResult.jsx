import React from "react";
import { useLocation } from "react-router-dom";
import CameraSearch from "./CameraSearch";

const BeerSearchResult = () => {
  const { state } = useLocation();
  console.log(state)

  return (
    <>
      <div className="wrapper beer">
        <h1>検索結果</h1>
        <div>{state["name"]} / {state["beer_style"]["name"]} / {state["country"]["name"]}</div>
        <img src={state["sample_image_url"]} alt="" className="search-result-image" />
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerSearchResult;
