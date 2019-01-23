class Api::CategoriesController < ApplicationController
  before_action :authenticate_user, except: %i[index]

  def index
    render json: Category.all
                   .to_json(only: %i[id name])
  end
end