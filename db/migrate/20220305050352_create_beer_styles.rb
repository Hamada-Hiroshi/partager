class CreateBeerStyles < ActiveRecord::Migration[6.1]
  def change
    create_table :beer_styles, id: :integer do |t|
      t.string :name, null: false
      t.integer :groop, null: false

      t.timestamps
    end
  end
end
