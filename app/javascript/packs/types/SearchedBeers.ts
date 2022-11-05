import BeerInfo from "./BeerInfo";

type SearchedBeers = {
  params : string;
  title: string;
  beers: Array<BeerInfo>;
}
export default SearchedBeers;
