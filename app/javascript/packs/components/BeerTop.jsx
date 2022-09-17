import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CameraSearch from "./CameraSearch";

const BeerTop = () => {
  const handleSearch = () => {
    console.log("検索実行");
    // setProgress(true);
    // let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
    // let data = {
    //   "review": {
    //     "drink_id": drinkId,
    //     "drink_type": drinkType.charAt(0).toUpperCase() + drinkType.slice(1),
    //     "score": rating,
    //     "comment": inputComment.current.value
    //   }
    // }
    //
    // axios
    //   .post("/reviews", data, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRF-Token": csrfToken
    //     }
    //   })
    //   .then((response) => {
    //     setReviewModalOpen(false);
    //     displaySendButton(false);
    //     setUserInfo({
    //       isLogin: userInfo.isLogin,
    //       reviewedBeerIds: userInfo.reviewedBeerIds.concat(drinkId),
    //       reviewedWineIds: userInfo.reviewedWineIds,
    //       reviewedSakeIds: userInfo.reviewedSakeIds
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setProgress(false);
    //   });
  }

  return (
    <>
      <div className="no-wrapper beer top">
        <div className="beer-search">
          <div id="beer-keyword-search">
            <TextField
              id="outlined-search"
              label={false}
              type="search"
              variant="outlined"
              placeholder="キーワードを入力してください"
              fullWidth
            />
            <SearchIcon onClick={handleSearch} />
          </div>

          <h2 className="sub-title">ビールを検索する</h2>
          <div id="select-beer-genre">
            <Link to="/beers?category=lager" className="beer-genre" id="lager">
              <p style={{ color: "#000" }}>
                <span className="main-font">Lager</span>
                <br />
                <span className="sub-font">-ラガー-</span>
              </p>
            </Link>
            <Link to="/beers?category=ale" className="beer-genre" id="ale">
              <p style={{ color: "#FFF" }}>
                <span className="main-font">Ale</span>
                <br />
                <span className="sub-font">-エール-</span>
              </p>
            </Link>
            <Link to="/beers?category=others" className="beer-genre" id="others">
              <p style={{ color: "#000" }}>
                <span className="main-font">Others</span>
                <br />
                <span className="sub-font">-その他-</span>
              </p>
            </Link>
            <div className="beer-genre" id="all-style">
              <p>すべてのスタイル</p>
            </div>
          </div>
        </div>
      </div>
      <CameraSearch />
    </>
  );
};
export default BeerTop;

