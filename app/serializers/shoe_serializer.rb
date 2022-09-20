class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :brand, :size, :image, :firebase

  belongs_to :user, optional: true
  belongs_to :store
end
