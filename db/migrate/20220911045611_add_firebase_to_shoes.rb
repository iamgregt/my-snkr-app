class AddFirebaseToShoes < ActiveRecord::Migration[6.1]
  def change
    add_column :shoes, :firebase, :string
  end
end
