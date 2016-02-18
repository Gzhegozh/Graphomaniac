class Chapter < ActiveRecord::Base
  belongs_to :record

  def self.get_chapters(book_id)
    @chapters = Chapter.find_by(record_id: book_id)
  end

  def self.update_by_order(params)
    Chapter.where(order: params[:chapter][:order], record_id: params[:chapter][:record_id]).limit(1).update_all(title: params[:chapter][:title], content: params[:chapter][:content])
  end
end
