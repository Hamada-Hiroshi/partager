import React, { useState, useLayoutEffect, useRef, VFC, memo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { preloadImages } from "../../common";
import SearchFooterLayout from "../templates/SearchFooterLayout";
import AverageScore from "../molecules/AverageScore";
import LoadingSpinner from "../atoms/LoadingSpinner";
import { beerSearchResultsState } from "../../store/beerSearchResultsState";
import SearchedBeers from "../../types/SearchedBeers";

const Beers: VFC = memo(() => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const searchedTitle = useRef<string>("");
  const beerIds = useRef<number[]>([]);
  const [searchResults, setSearchResults] = useRecoilState<SearchedBeers>(beerSearchResultsState);

  const loadMore = async (page: number) => {
    const csrfToken = (document.head.querySelector("[name=csrf-token][content]") as HTMLMetaElement).content;
    const headers = { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json", "X-CSRF-Token": csrfToken }
    console.log("load_page", page)

    if (page == 1) {
      const searchBeers = async () => {
        try {
          const searchResponse = await axios.get(`/beers/search/ajax${search}`, { headers: headers });
          console.log("beer_ids", searchResponse.data.beer_ids);
          if (searchResponse.data) {
            searchedTitle.current = searchResponse.data.title;
            beerIds.current = searchResponse.data.beer_ids;
          } else {
            navigate("/beers/no_search_result");
          }
        } catch (error) {
          console.log(error);
        }
      }
      await searchBeers();
    }

    // beerIds10件分ずつデータを取得する
    const loadBeers = async () => {
      try {
        const storedBeerIds = searchResults.beers.map(beer => beer.id);
        const diffBeerIds = beerIds.current.filter(beerId => !storedBeerIds.includes(beerId));
        const targetIds = diffBeerIds.slice(0, 10);
        console.log("target", targetIds);
        if (targetIds.length < 1) {
          setHasMore(false);
          return;
        }
        const beersResponse = await axios.get(`/beers/ajax?ids=${targetIds}`, { headers: headers });
        await preloadImages(beersResponse.data);
        console.log("プリロード完了");
        setSearchResults({
          params: searchResults.params,
          title: searchedTitle.current,
          beers: [...searchResults.beers, ...beersResponse.data]
        });
      } catch (error) {
        console.log(error);
      }
    }
    loadBeers();
  }

  // URL直打ちの場合
  useLayoutEffect(() => {
    if (decodeURI(search) != searchResults.params) {
      setSearchResults({ params: decodeURI(search), title: "", beers: [] });
    }
  }, []);

  return (
    <SearchFooterLayout>
      <div className="wrapper beer index">
        {decodeURI(search) == searchResults.params && (
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={<LoadingSpinner key={0} />}>
            <h2 className="sub-title">{searchResults.title}</h2>
            {console.log("一覧表示", searchResults.beers)}
            {searchResults.beers.map(beer => (
              <Link to={`/beers/${beer.id}`} state={beer} key={beer.id}>
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
          </InfiniteScroll>
        )}
      </div>
    </SearchFooterLayout>
  );
});
export default Beers;
