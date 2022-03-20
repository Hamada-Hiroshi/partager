# == Schema Information
#
# Table name: beer_styles
#
#  id         :integer          not null, primary key
#  category   :integer          not null
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class BeerStyle < ApplicationRecord
  has_many :beers

  validates :name, presence: true
  validates :category, presence: true

  enum category: { lager: 0, ale: 1, others: 2, unknown: 99 }
end
