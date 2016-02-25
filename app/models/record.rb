class Record < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :chapters, :dependent => :destroy
  has_many :comments, :as => :commentable, :dependent => :destroy
  acts_as_taggable

  def self.add_user_record(user_id, record_id)
    @user = User.find_by_id(user_id)
    @user.records << Record.find_by_id(record_id)
  end

  def self.show_user_records(user_id)
    @user = User.find_by_id(user_id)
    @records = Record.includes(:users).where('users.id' => user_id)
  end

  def self.get_author(id)
    @author = User.includes(:records).where('records.id' => id)
  end

  def self.get_chapters(record_id)
    @record = Record.includes(:chapters).order('chapters.order').find(record_id);
  end

  def self.get_records_with_authors
    #@record = Record.includes(:users);
    @records_authors = Record.find_by_sql("SELECT name, alias, title, description, records.updated_at, record_id FROM records
      INNER JOIN records_users ON records.id = records_users.record_id
      INNER JOIN users ON users.id = records_users.user_id
      ORDER BY users.id")
  end
end
