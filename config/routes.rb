Rails.application.routes.draw do

  # API's
  namespace :api do
    post 'user/token' => 'user_token#create'
    get 'users/current' => 'users#current'

    resources :blogs, only: %i[index]
  end

  # Application Entry-Point
  root 'pages#root'
  match '*path' => redirect('/'), via: :all
end
