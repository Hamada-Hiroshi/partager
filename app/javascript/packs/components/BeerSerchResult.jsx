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
        <div>
          {state["beer"]["name"]} / {state["beer"]["beer_style"]["name"]} / {state["beer"]["country"]["name"]}
        </div>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerSearchResult;
