Rails.application.routes.draw do
  root "home#index"
  devise_for :users
  post "/beers/image_seach" => "beers#image_seach"
  get "/beer" => redirect("/")
  get "/wine" => redirect("/")
  get "/sake" => redirect("/")

end
