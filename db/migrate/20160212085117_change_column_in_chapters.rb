class ChangeColumnInChapters < ActiveRecord::Migration
  def change
    change_column :chapters, :content,  :text
  end
end
