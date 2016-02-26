class AddBookmarksRefToUsersAndChapters < ActiveRecord::Migration
  def change
    add_foreign_key :bookmarks, :records
    add_foreign_key :bookmarks, :users
  end
end
