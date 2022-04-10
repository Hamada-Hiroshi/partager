Rails.application.routes.draw do
  root "home#index"
  devise_for :users
  get "/beer" => "beers#top"
  resources :beers, only: :index do
    collection do
      post "image_search"
      get "search_result" => redirect("/beer")
    end
  end

  get "/wine" => redirect("/")
  get "/sake" => redirect("/")

end
