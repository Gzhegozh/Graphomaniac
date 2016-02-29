class AddCommentsRefToUsers < ActiveRecord::Migration
  def change
    add_column :comments, :user_id, :integer
    add_reference :comments, :users, index: true, foreign_key: true
  end
end
