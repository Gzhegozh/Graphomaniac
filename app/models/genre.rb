class Genre < ActiveRecord::Base
  has_many :records
  belongs_to :category
end
