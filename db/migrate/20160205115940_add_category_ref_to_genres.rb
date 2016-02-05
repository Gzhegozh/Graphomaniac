class AddCategoryRefToGenres < ActiveRecord::Migration
  def change
    add_reference :genres, :category, index: true, foreign_key: true
  end
end
