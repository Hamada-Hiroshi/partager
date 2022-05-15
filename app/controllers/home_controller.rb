class HomeController < ApplicationController
  def index
    @current_user_props = { is_login: user_signed_in? }
  end
end
