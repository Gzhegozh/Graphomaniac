class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.string :title, null: false
      t.string :content
      t.integer :order, null: false
    end
  end
end
