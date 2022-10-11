class StoreSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo
  has_many :users
  has_many :shoes
end
