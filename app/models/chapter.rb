class Chapter < ActiveRecord::Base
  belongs_to :record

  def self.get_chapters(book_id)
    @chapters = Chapter.find_by(record_id: book_id)
  end
end
