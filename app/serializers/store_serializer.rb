class StoreSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :users
  has_many :shoes
end
