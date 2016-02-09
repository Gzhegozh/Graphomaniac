class CreateRecordsUsers < ActiveRecord::Migration
  def self.up
    create_table :records_users, :id => false do |t|
      t.references :record
      t.references :user
    end
    add_index :records_users, [:record_id, :user_id]
    add_index :records_users, :user_id
  end

  def self.down
    drop_table :records_users
  end
end
