class AddRecordsRefToGenres < ActiveRecord::Migration
  def change
    add_column :records, :genre_id, :integer
    add_reference :records, :genres, index: true, foreign_key: true
  end
end
