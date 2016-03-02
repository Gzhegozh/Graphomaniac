class Record < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :chapters, :dependent => :destroy
  belongs_to :genre
  has_many :comments, :as => :commentable, :dependent => :destroy
  acts_as_taggable
  searchkick autocomplete: ['title']

  has_attached_file :cover, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "https://www.octopusbooks.co.uk/assets/img/newsletter_placeholder.jpg"
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

  include Elasticsearch::Model

  def as_indexed_json(options={})
    self.as_json(
        only: [:id, :title, :description, :genre, :category]
    )
  end

  def self.import
    Record.all.find_in_batches do |records|
      Record.__elasticsearch__.client.bulk({
         index: ::Record.__elasticsearch__.index_name,
         type: ::Record.__elasticsearch__.document_type,
         body: records.map do |record|
           {
               index: {
                   _id: record.id,
                   data: record.as_indexed_json
               }
           }
         end
     })
    end
  end

  after_commit '__elasticsearch__.index_document', on: :create
  after_commit '__elasticsearch__.update_document', on: :update
  after_commit :update_index_on_destroy, on: :destroy

  def update_index_on_destroy
    __elasticsearch__.client.delete(
        index: Record.index_name,
        type: Record.document_type,
        id: id
    )
  end

  def self.search(params, *args)
    query = "title: *#{params}* OR description: *#{params}*"
    es = Record.__elasticsearch__.search(
        query: {query_string: {query: query}},
        size: 20
    )
    es.records.to_a
  # if es.count
  #   return search_id_db(params)
  # end
end

Record.__elasticsearch__.create_index! force: true
Record.import


def self.add_user_record(user_id, record_id)
    @user = User.find_by_id(user_id)
    @user.records << Record.find_by_id(record_id)
  end

  def self.show_user_records(user_id)
    @user = User.find_by_id(user_id)
    @records = Record.includes(:users, :genre).where('users.id' => user_id)
  end

  def self.get_author(id)
    @author = User.includes(:records).where('records.id' => id)
  end

  def self.get_chapters(record_id)
    @record = Record.includes(:chapters, :users).order('chapters.order').find(record_id);
  end

end
