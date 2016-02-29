class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.string :name, null: false
      t.string :anchor, null: false
      t.integer :index, null: false
      t.integer :chapter_id, null: false
      t.integer :user_id, null: false
    end
  end
end
