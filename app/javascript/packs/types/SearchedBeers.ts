import Beer from "./Beer";

type SearchedBeers = {
  params : string;
  title: string;
  beers: Array<Beer>;
}
export default SearchedBeers;
