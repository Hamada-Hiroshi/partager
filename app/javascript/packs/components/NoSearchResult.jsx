import React from "react";
import CameraSearch from "./CameraSearch";

const NoSearchResult = () => {
  return (
    <>
      <div className="wrapper beer">
        <h1>検索結果</h1>
        <p>検索にヒットしませんでした。</p>
      </div>
      <CameraSearch />
    </>
  );
};
export default NoSearchResult;
