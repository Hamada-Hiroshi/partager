import React from "react";
import SearchFooterLayout from "../templates/SearchFooterLayout";

const NoSearchResult: React.VFC = () => {
  return (
    <SearchFooterLayout>
      <div className="wrapper beer">
        <h1>検索結果</h1>
        <p>検索にヒットしませんでした。</p>
      </div>
    </SearchFooterLayout>
  );
};
export default NoSearchResult;
