class AddInterestToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :interest, :text
  end
end
