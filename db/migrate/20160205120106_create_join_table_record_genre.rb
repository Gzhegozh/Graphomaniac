class CreateJoinTableRecordGenre < ActiveRecord::Migration
  def change
    create_join_table :records, :genres do |t|
       t.index :record_id
       t.index :genre_id
    end
  end
end
