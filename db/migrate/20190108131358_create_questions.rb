class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :question
      t.string :description
      t.string :tag

      t.timestamps
    end
  end
end
