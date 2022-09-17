class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :size, :image, :firebase

  belongs_to :user
  belongs_to :store
end
