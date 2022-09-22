class AddForSaleToShoes < ActiveRecord::Migration[6.1]
  def change
    add_column :shoes, :for_sale, :boolean
  end
end
