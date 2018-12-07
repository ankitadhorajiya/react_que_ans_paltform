class Api::BlogsController < ApplicationController
  def index
    order =
      case params[:type]
      when 'recent'
        'order_by_recent'
      when 'popular'
        'order_by_likes'
      end
    render json: Blog.send(order)
                     .as_json(only: %i(id title content tags like_count dislike_count))
  end
end
