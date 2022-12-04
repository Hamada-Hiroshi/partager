Rails.application.routes.draw do
  root "home#index"

  devise_for :users, :controllers => {
    :sessions => "users/sessions",
    :registrations => "users/registrations",
    :passwords => "users/passwords"
  }

  get "/beer" => "beers#top"
  resources :beers, only: [:index, :show] do
    collection do
      get "search/ajax" => "beers#search_beers_ajax"
      get "ajax" => "beers#get_beers_ajax"
      get ":id/ajax" => "beers#get_beer_info_ajax"
      post "image_search"
      get "no_search_result"
    end
  end

  get "/wine" => redirect("/")
  get "/sake" => redirect("/")

  resources :reviews, only: :create
end
