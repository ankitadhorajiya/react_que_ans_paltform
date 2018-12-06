class AddLikeDislikeCountToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :like_count, :integer, default: 0
    add_column :blogs, :dislike_count, :integer, default: 0
  end
end
