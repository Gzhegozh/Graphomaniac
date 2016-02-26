class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.text :anchor, null: false
      t.string :name, null: false
      t.integer :index, null: false
      t.integer :order, null: false
      t.integer :record_id, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
  end
end
