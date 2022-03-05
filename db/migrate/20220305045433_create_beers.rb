class CreateBeers < ActiveRecord::Migration[6.1]
  def change
    create_table :beers, id: :integer do |t|
      t.string :name, null: false
      t.integer :beer_style_id, null: false
      t.integer :country_id, null: false

      t.timestamps
    end
  end
end
