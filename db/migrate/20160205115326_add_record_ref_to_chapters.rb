class AddRecordRefToChapters < ActiveRecord::Migration
  def change
    add_reference :chapters, :record, index: true, foreign_key: true
  end
end
