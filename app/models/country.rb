# == Schema Information
#
# Table name: countries
#
#  id           :integer          not null, primary key
#  abbreviation :string(255)      not null
#  en_name      :string(255)      not null
#  name         :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Country < ApplicationRecord
  has_many :beers

  validates :name, presence: true
  validates :abbreviation, presence: true
end
