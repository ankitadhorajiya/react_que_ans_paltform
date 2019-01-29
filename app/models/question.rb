class Question < ApplicationRecord

  def self.topic(topic)
    where('tag ilike ?', "%#{topic}%")
  end
end
