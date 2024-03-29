import React, { memo } from "react";
import ReactStars from "react-rating-stars-component";
import ReviewsData from "../../types/ReviewsData"

type AverageScore = {
  reviewsData: ReviewsData | null;
}

const AverageScore: React.VFC<AverageScore> = memo((props) => {
  const { reviewsData } = props;

  if (reviewsData === null) {
    return (
      <p>評価がありません</p>
    );
  } else {
    return (
      <>
        <div className="average-score-main">{reviewsData.average_score.toFixed(1)}</div>
        <div className="average-score-sub">
          <ReactStars
            size={18}
            value={reviewsData.average_score}
            isHalf={true}
            edit={false}
            activeColor="#993333"
          />
          <span className="reviews-count">{`${reviewsData.count}件の評価`}</span>
        </div>
      </>
    );
  }
});
export default AverageScore;

