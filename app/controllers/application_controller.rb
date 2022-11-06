class ApplicationController < ActionController::Base
  private

  def store_location
    session[:previous_url] = request.referer
  end

  def set_current_user_props
    is_login = user_signed_in?
    reviews = current_user&.reviews
    reviewed_beer_ids = is_login ? reviews.where(drink_type: "Beer").pluck(:drink_id) : []
    reviewed_wine_ids = is_login ? reviews.where(drink_type: "Wine").pluck(:drink_id) : []
    reviewed_sake_ids = is_login ? reviews.where(drink_type: "Sake").pluck(:drink_id) : []
    @current_user_props = {
      isLogin: is_login,
      reviewedBeerIds: reviewed_beer_ids,
      reviewedWineIds: reviewed_wine_ids,
      reviewedSakeIds: reviewed_sake_ids,
    }
  end
end
