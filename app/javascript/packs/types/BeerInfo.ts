import ReviewsData from "./ReviewsData";
import BeerStyle from "./BeerStyle";
import Country from "./Country";

type BeerInfo = {
  id: number;
  name: string;
  label_text: string | null;
  beer_style_id: number;
  country_id: number;
  sample_image_url: string;
  content_image_url: string;
  reviews_data: ReviewsData | null;
  beer_style: BeerStyle;
  country: Country;
}
export default BeerInfo;
