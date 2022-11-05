import { atom } from "recoil";
import SearchedBeers from "../types/SearchedBeers";

export const beerSearchResultsState = atom<SearchedBeers>({
  key: "beerSearchResultsState",
  default: {
    params: "",
    title: "",
    beers: []
  }
});
