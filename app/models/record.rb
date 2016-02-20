class Record < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :chapters
  has_many :comments, :as => :commentable, :dependent => :destroy

  def self.add_user_record(user_id, record_id)
    @user = User.find_by_id(user_id)
    @user.records << Record.find_by_id(record_id)
  end

  def self.show_user_records(user_id)
    @user = User.find_by_id(user_id)
    @records = Record.includes(:users).where('users.id' => user_id)
  end


  def self.get_chapters(record_id)
    @chapters = Record.find_by_sql("SELECT chapters.title AS title, chapters.content, chapters.order
       FROM records LEFT OUTER JOIN chapters
       ON chapters.record_id = records.id
       WHERE records.id = #{record_id}
       ORDER BY chapters.order")
  end

  def self.get_chapter_text(record_id, order)
    connection = ActiveRecord::Base.connection
    @text = connection.execute("SELECT chapters.title, chapters.content FROM chapters WHERE chapters.record_id = #{record_id} AND chapters.order = #{order}")
    @text[0]
  end

  def self.get_records_with_authors
    @records_authors = Record.find_by_sql("SELECT name, alias, title, description, records.updated_at, record_id FROM records
      INNER JOIN records_users ON records.id = records_users.record_id
      INNER JOIN users ON users.id = records_users.user_id
      ORDER BY users.id")
  end
end
