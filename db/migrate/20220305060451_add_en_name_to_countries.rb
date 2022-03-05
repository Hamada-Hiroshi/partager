class AddEnNameToCountries < ActiveRecord::Migration[6.1]
  def change
    add_column :countries, :en_name, :string, null: false, after: :name
  end
end
