Rails.application.routes.draw do
  # API's
  namespace :api do
    post 'user/token' => 'user_token#create'
    get 'users/current' => 'users#current'
    post 'users/create' => 'users#create'
    resources :questions

    resources :blogs, only: %i[index show]
    resources :questions, only: %i[index]
    resources :categories, only: %i[index]
  end

  # Application Entry-Point
  root 'pages#root'
  match '*path' => redirect('/'), via: :all
end
