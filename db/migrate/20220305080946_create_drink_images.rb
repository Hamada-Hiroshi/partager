class CreateDrinkImages < ActiveRecord::Migration[6.1]
  def change
    create_table :drink_images do |t|
      t.integer :user_id, null: false
      t.integer :drink_id, null: false
      t.string :drink_type, null: false
      t.boolean :is_sample, null: false, default: false

      t.timestamps
    end
  end
end
