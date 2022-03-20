Rails.application.routes.draw do
  root "home#index"
  devise_for :users
  get "/beer" => "beers#top"
  post "/beers/image_search" => "beers#image_search"
  get "/beers/search_result" => redirect("/beer")
  get "/wine" => redirect("/")
  get "/sake" => redirect("/")

end
