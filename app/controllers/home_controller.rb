class HomeController < ApplicationController
  def index
    set_current_user_props
  end
end
