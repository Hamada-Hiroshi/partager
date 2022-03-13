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
        <ul>
          {state.map((beer, i) =>
            <li key={i}>
              <div>{beer["name"]} / {beer["beer_style"]["name"]} / {beer["country"]["name"]}</div>
            </li>
          )}
        </ul>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerSearchResult;
