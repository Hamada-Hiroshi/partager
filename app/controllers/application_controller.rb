class ApplicationController < ActionController::Base
  private

  def set_current_user_props
    is_login = user_signed_in?
    reviews = current_user&.reviews
    reviewed_beer_ids = is_login ? reviews.where(drink_type: "Beer").pluck(:drink_id) : []
    reviewed_wine_ids = is_login ? reviews.where(drink_type: "Wine").pluck(:drink_id) : []
    reviewed_sake_ids = is_login ? reviews.where(drink_type: "Sake").pluck(:drink_id) : []
    @current_user_props = {
      is_login: is_login,
      reviewed_beer_ids: reviewed_beer_ids,
      reviewed_wine_ids: reviewed_wine_ids,
      reviewed_sake_ids: reviewed_sake_ids,
    }
  end
end
