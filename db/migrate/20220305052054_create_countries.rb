class CreateCountries < ActiveRecord::Migration[6.1]
  def change
    create_table :countries, id: :integer do |t|
      t.string :name, null: false
      t.string :abbreviation, null: false

      t.timestamps
    end
  end
end
