import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";
import CameraSearch from "../organisms/CameraSearch";
import AverageScore from "../molecules/AverageScore";
import LoadingSpinner from "../atoms/LoadingSpinner";
import { useRecoilState } from "recoil";
import { beerSearchResultsState } from "../../store/beerSearchResultsState";
import { scrollPositionState } from "../../store/scrollPositionState";
import SearchedBeers from "../../types/SearchedBeers";
import ScrollPosition from "../../types/ScrollPosition";
import { preloadImages } from "../../common";

const Beers = () => {
  const navigate = useNavigate();
  const { search, hash } = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useRecoilState<SearchedBeers>(beerSearchResultsState);
  const [scrollPosition, setScrollPosition] = useRecoilState<ScrollPosition>(scrollPositionState);

  useEffect(() => {
    if (decodeURI(search) == searchResults.params) {
      setLoading(false);
    } else {
      const getBeers = async () => {
        const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
        try {
          const response = await axios.get(`/beers/ajax/${search}`, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken
            }
          });
          console.log(response.data);
          if (response.data) {
            await preloadImages(response.data.beers);
            console.log("プリロード完了");
            setSearchResults({ params: search, title: response.data.title, beers: response.data.beers });
            setLoading(false);
          } else {
            navigate("/beers/no_search_result");
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      getBeers();
    }
  }, []);

  useEffect(() => {
    if (!loading && search == scrollPosition.params && hash == "#back") {
      console.log("ブラウザバックスクロール");
      window.scrollTo(0, scrollPosition.scrollY);
    }
  }, [loading]);

  return (
    <>
      <div className="wrapper beer index">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2 className="sub-title">{searchResults.title}</h2>
            {console.log("一覧表示")}
            {searchResults.beers.map(beer => (
              <Link
                to={`/beers/${beer.id}`}
                state={beer} key={beer.id}
                onClick={() => {
                  setScrollPosition({ params: search, scrollY: window.scrollY });
                  if (!hash.length) {
                    window.history.replaceState(null, "", `${location.href}#back`);
                  }
                }}
              >
                <div className="drink-box">
                  <div className="background-drink-image">
                    <img src={beer.content_image_url} alt="" className="beer-content-image" />
                  </div>
                  <Grid container className="drink-info-box">
                    <Grid item xs={5} className="drink-image">
                      <img src={beer.sample_image_url} alt="" className="beer-image" />
                    </Grid>
                    <Grid item xs={7} className="drink-score">
                      <AverageScore reviewsData={beer.reviews_data} />
                    </Grid>
                    <Grid item xs={12} className="drink-info">
                      <p className="dink-title">{beer.name}</p>
                      <p className="beer-style">ビアスタイル：{beer.beer_style.name}</p>
                      <p className="country">
                        <span className={`flag-icon flag-icon-${beer.country.abbreviation}`}></span>
                        {beer.country.name}
                      </p>
                    </Grid>
                  </Grid>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <CameraSearch />
    </>
  );
};
export default Beers;
