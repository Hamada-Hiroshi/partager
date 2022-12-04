import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { preloadImages } from "../../common";
import SearchFooterLayout from "../templates/SearchFooterLayout";
import SubmittingSpinner from "../atoms/SubmittingSpinner";
import { beerSearchResultsState } from "../../store/beerSearchResultsState";
import SearchedBeers from "../../types/SearchedBeers";

const BeerTop: React.VFC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<boolean>(false);
  const inputKeyword = useRef<HTMLInputElement>(null);
  const lagerParam: string = "?category=lager";
  const aleParam: string = "?category=ale";
  const othersParam: string = "?category=others";
  const [searchResults, setSearchResults] = useRecoilState<SearchedBeers>(beerSearchResultsState);

  const searchKeyword = async () => {
    setProgress(true);
    const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
    const headers = { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json", "X-CSRF-Token": csrfToken }
    let keywordParam = `?keyword=${inputKeyword.current?.value}`

    try {
      const searchResponse = await axios.get(`/beers/search/ajax${keywordParam}`, { headers: headers });
      console.log(searchResponse.data);
      if (searchResponse.data) {
        const beersResponse = await axios.get(`/beers/ajax?ids=${searchResponse.data.beer_ids}`, { headers: headers });
        console.log(beersResponse.data);
        await preloadImages(beersResponse.data);
        setSearchResults({ params: keywordParam, title: searchResponse.data.title, beers: beersResponse.data });
        navigate(`/beers${keywordParam}`, { state: beersResponse.data });
      } else {
        navigate("/beers/no_search_result");
      }
    } catch (error) {
      console.log(error);
      setProgress(false);
    }
  };

  const setSearchParams = (params: string) => {
    if (params != searchResults.params) {
      setSearchResults({ params: params, title: "", beers: [] });
    }
  };

  return (
    <SearchFooterLayout>
      <SubmittingSpinner progress={progress} />
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
            <Link to={`/beers${lagerParam}`} onClick={() => setSearchParams(lagerParam)} className="beer-genre" id="lager">
              <p style={{ color: "#000" }}>
                <span className="main-font">Lager</span>
                <br />
                <span className="sub-font">-ラガー-</span>
              </p>
            </Link>
            <Link to={`/beers${aleParam}`} onClick={() => setSearchParams(aleParam)} className="beer-genre" id="ale">
              <p style={{ color: "#FFF" }}>
                <span className="main-font">Ale</span>
                <br />
                <span className="sub-font">-エール-</span>
              </p>
            </Link>
            <Link to={`/beers${othersParam}`} onClick={() => setSearchParams(othersParam)} className="beer-genre" id="others">
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
    </SearchFooterLayout>
  );
};
export default BeerTop;
