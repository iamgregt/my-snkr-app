class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :created_at, :updated_at, :summary

  has_many :shoes

  def summary
    shoes_count = self.object.shoes.count

    if shoes_count == 1
      resp = 'pair'
    else resp = 'pairs'
    end

    "#{self.object.username} has #{shoes_count} #{resp} of shoes."
  end
end
