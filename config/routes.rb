Rails.application.routes.draw do
  root "home#index"
  devise_for :users
  post "/beers/image_search" => "beers#image_search"
  get "/beer" => "beers#top"
  get "/wine" => redirect("/")
  get "/sake" => redirect("/")

end
