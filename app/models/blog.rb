class Blog < ApplicationRecord
  # Validations
  validates :title,
            presence: true,
            length: { minimum: 10, maximum: 100 }

  validates :content,
            presence: true,
            length: { minimum: 100, maximum: 10000 }

  # Scopes
  scope :admin_approved, -> { where(admin_approved: true) }
  scope :order_by_likes, -> { admin_approved.order(like_count: :desc)}
  scope :order_by_dislikes, -> { admin_approved.order(dislike_count: :desc)}
  scope :order_by_recent, -> { admin_approved.order(created_at: :desc)}
end
