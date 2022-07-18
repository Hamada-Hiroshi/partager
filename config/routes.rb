Rails.application.routes.draw do
  root "home#index"
  devise_for :users

  get "/beer" => "beers#top"
  resources :beers, only: [:index, :show] do
    collection do
      post "image_search"
      get "search_result" => redirect("/beer")
    end
  end

  get "/wine" => redirect("/")
  get "/sake" => redirect("/")

  resources :reviews, only: :create
end
