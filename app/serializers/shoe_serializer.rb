class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :brand, :size, :image, :firebase

  belongs_to :user
  belongs_to :store
end
