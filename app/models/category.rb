class Category < ActiveRecord::Base
  has_many :genres
end
