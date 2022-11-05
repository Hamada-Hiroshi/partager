import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Backdrop } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { beerSearchResultsState } from "../store/beerSearchResultsState";
import SearchedBeers from "../types/SearchedBeers";
import CameraSearch from "./CameraSearch";
import { preloadImages } from "../common";

const BeerTop: React.VFC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<boolean>(false);
  const inputKeyword = useRef<HTMLInputElement>(null);
  const setSearchResults = useSetRecoilState<SearchedBeers>(beerSearchResultsState);

  const searchKeyword = async () => {
    setProgress(true);
    const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
    let keywordParam = `?keyword=${inputKeyword.current?.value}`

    try {
      const response = await axios.get(`/beers${keywordParam}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        }
      });
      console.log(response.data);
      if (response.data) {
        await preloadImages(response.data.beers);
        setSearchResults({ params: keywordParam, title: response.data.title, beers: response.data.beers });
        navigate(`/beers${keywordParam}`, { state: response.data });
      } else {
        navigate("/beers/no_search_result");
      }
    } catch (error) {
      console.log(error);
      setProgress(false);
    }
  };

  return (
    <>
      <Backdrop open={progress} style={{ zIndex: 99 }}>
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </Backdrop>

      <div className="no-wrapper beer top">
        <div className="beer-search"> <div id="beer-keyword-search">
            <TextField
              id="outlined-search"
              label={false}
              type="search"
              variant="outlined"
              placeholder="キーワードを入力してください"
              inputRef={inputKeyword}
              fullWidth
            />
            <SearchIcon onClick={() => searchKeyword()} />
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
