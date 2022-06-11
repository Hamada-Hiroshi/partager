class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :drink_id, null: false
      t.string :drink_type, null: false
      t.float :score, null: false
      t.text :comment

      t.timestamps
    end
  end
end
