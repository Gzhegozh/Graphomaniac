class AddOrderIndexToChapters < ActiveRecord::Migration
  def change
    add_index :chapters, :order, :unique => true
  end
end
