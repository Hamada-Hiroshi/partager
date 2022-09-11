class AddLabelTextToBeers < ActiveRecord::Migration[6.1]
  def change
    add_column :beers, :label_text, :text, after: :name
  end
end
