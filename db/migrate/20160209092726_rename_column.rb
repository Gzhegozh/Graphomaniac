class RenameColumn < ActiveRecord::Migration
  def change
    rename_column :records, :descrtiption, :description
  end
end
