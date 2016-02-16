class Chapter < ActiveRecord::Base
  belongs_to :record

  def self.get_chapters(book_id)
    @chapters = Chapter.find_by(record_id: book_id)
  end

  def self.update_by_order(params)
    # connection = ActiveRecord::Base.connection
    # connection.execute("UPDATE chapters SET
    #       title = #{params[:title]},
    #       content = #{params[:content]},
    #       record_id = #{params[:record_id]}
    #       WHERE \"order\" = #{params[:order]}");
    # chapter = Chapter.find_by_order(params[:chapter][:order])
    # byebug
    # сhapter.update_attributes(title: params[:title], content: params[:content], record_id: params[:record_id])
    Chapter.where(order: params[:chapter][:order]).limit(1).update_all(title: params[:chapter][:title], content: params[:chapter][:content], record_id: params[:chapter][:record_id])
  end
end
