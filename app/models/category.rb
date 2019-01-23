class Category < ApplicationRecord

  # HABTM relation with user
  has_and_belongs_to_many :users
end
