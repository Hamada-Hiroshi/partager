class ReviewsController < ApplicationController
  def create
    review = current_user.reviews.build(review_params)
    review.save!
    head :created
  end

  private

  def review_params
    params.require(:review).permit(:drink_id, :drink_type, :score, :comment)
  end
end
