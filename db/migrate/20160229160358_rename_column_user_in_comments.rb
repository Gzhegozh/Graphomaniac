class RenameColumnUserInComments < ActiveRecord::Migration
  def change
    rename_column :comments, :user, :username
  end
end
