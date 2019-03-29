require 'elasticsearch/model'

class Question < ApplicationRecord

  # include Searchable
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks


  # index_name 'example_app'
  document_type self.name.downcase

  # For elastic search create index and import
  Question.__elasticsearch__.create_index!(force: true)
  Question.import

  settings number_of_shards: 1 do
    mappings dynamic: 'false' do
      indexes :question, type: 'text', analyzer: 'english'
      indexes :tag, type: 'text', analyzer: 'english'
    end
  end

  def self.search(query)
    __elasticsearch__.search(
      {
        query: {
          multi_match: {
            query: query,
            fields: ['question', 'tag'],
            fuzziness: 'auto',
            minimum_should_match: 2,
            "zero_terms_query": "all"
          }
        }
      }
    )
  end

  def self.topic(topic)
    where('tag ilike ?', "%#{topic}%")
  end
end
