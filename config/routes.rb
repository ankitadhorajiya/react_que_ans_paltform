Rails.application.routes.draw do
  # API's
  namespace :api do
    post 'user/token' => 'user_token#create'
    get 'users/current' => 'users#current'
    post 'users/create' => 'users#create'
    get 'users/send_mail' => 'users#send_mail'
    resources :questions do
      collection do
        get :search
      end
    end

    resources :blogs, only: %i[index show]
    resources :questions, only: %i[index]
    resources :categories, only: %i[index]
  end
  resources :questions

  # Application Entry-Point
  root 'pages#root'
  match '*path' => redirect('/'), via: :all
end
