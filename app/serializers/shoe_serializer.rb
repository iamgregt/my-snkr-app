class ShoeSerializer < ActiveModel::Serializer
  attributes :id, :size, :image, :user_id, :firebase
end
