class Api::BlogsController < ApplicationController
  def index
    if params[:]
    render json: Blog.admin_approved.as_json(only: %i(id title content tags like_count dislike_count))
  end
end
