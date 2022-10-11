class StoreSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo, :summary, :summary2
  has_many :users
  has_many :shoes

  def summary
    
    user_count = self.object.users.count

    if user_count == 1
      resp = 'user'
    else resp = 'users'
    end
    "#{user_count} #{resp} has shopped here"
  end

  def summary2
    shoes_count = self.object.shoes.count
    if shoes_count == 1
      resp = 'pair'
    else resp = 'pairs'
    end

    shoe_count = self.object.shoes.count
    "This store has sold #{shoe_count} #{resp} of shoes"
  end

end
