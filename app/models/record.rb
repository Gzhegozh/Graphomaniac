class Record < ActiveRecord::Base
  has_and_belongs_to_many :users

  def self.add_user_record(user_id, record_id)
    @user = User.find_by_id(user_id)
    @user.records << Record.find_by_id(record_id)
  end

  def self.show_user_records(user_id)
    @user = User.find_by_id(user_id)
    @records = Record.includes(:users).where('users.id' => user_id)
  end
end
