Rails.application.routes.draw do
  root "home#index"
  devise_for :users
  get "/beer" => redirect("/")
  get "/wine" => redirect("/")
  get "/sake" => redirect("/")
end
