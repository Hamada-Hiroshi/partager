class RenameGroopColumnToBeerStyles < ActiveRecord::Migration[6.1]
  def change
    rename_column :beer_styles, :groop, :category
  end
end
