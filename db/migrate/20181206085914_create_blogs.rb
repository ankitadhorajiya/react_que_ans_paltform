class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.string :title
      t.text :content
      t.string :tags
      t.boolean :admin_approved, default: false

      t.timestamps
    end
  end
end
