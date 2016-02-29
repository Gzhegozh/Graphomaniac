class AddAttachmentCoverToRecords < ActiveRecord::Migration
  def self.up
    change_table :records do |t|
      t.attachment :cover
    end
  end

  def self.down
    remove_attachment :records, :cover
  end
end
