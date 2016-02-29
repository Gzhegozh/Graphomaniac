class AddBookmarksRefToChaptersAndUsers < ActiveRecord::Migration
  def change
    add_reference :bookmarks, :chapters, index: true, foreign_key: true
    add_reference :bookmarks, :users, index: true, foreign_key: true
  end
end
