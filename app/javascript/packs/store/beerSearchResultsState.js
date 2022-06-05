import { atom } from "recoil";

export const beerSearchResultsState = atom({
  key: "beerSearchResultsState",
  default: {
    params: "",
    beers: []
  }
});
