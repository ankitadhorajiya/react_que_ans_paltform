class User < ApplicationRecord
  has_secure_password

  # HABTM relation with category
  has_and_belongs_to_many :categories

  validates :email, :password, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }

  serialize :interest, Hash
end
