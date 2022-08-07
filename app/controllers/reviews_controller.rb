class ReviewsController < ApplicationController
  def create
    review = current_user.reviews.
      find_or_initialize_by(drink_id: params[:review][:drink_id], drink_type: params[:review][:drink_type])
    review.attributes = review_params
    review.save!
    head :created
  end

  private

  def review_params
    params.require(:review).permit(:drink_id, :drink_type, :score, :comment)
  end
end
