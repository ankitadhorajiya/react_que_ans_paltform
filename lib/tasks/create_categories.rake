namespace :create_categories do
  desc 'create category'
  task new_category: :environment do
    categories_name = %i[
      ROR
      React
      Angular
      Node Js
      Android
      JAVA
      HTML
      CSS
    ]
    categories_name.each do |name|
      Category.create(name: name)
    end
    p "<--------Categories created-------->"
  end
end
