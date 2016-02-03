class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :users, :records do |t|
       t.index :user_id
       t.index :record_id
    end
  end
end
