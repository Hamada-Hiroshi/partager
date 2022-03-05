# == Schema Information
#
# Table name: beers
#
#  id            :integer          not null, primary key
#  name          :string(255)      not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  beer_style_id :integer          not null
#  country_id    :integer          not null
#
class Beer < ApplicationRecord
  belongs_to :beer_style
  belongs_to :country

  validates :name, presence: true
end
