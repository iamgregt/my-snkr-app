class AddStoreIdToShoes < ActiveRecord::Migration[6.1]
  def change
    add_column :shoes, :store_id, :integer
  end
end
