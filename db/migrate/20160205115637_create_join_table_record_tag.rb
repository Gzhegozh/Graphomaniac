class CreateJoinTableRecordTag < ActiveRecord::Migration
  def change
    create_join_table :records, :tags do |t|
       t.index :record_id
       t.index :tag_id
    end
  end
end
