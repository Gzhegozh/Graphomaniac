class AddTitleToBookmarks < ActiveRecord::Migration
  def change
    add_column :bookmarks, :title, :string, null: false
  end
end
