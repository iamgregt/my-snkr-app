class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :brand, :size, :image, :firebase, :for_sale

  belongs_to :user, optional: true
  belongs_to :store
end
