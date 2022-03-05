# == Schema Information
#
# Table name: beer_styles
#
#  id         :integer          not null, primary key
#  groop      :integer          not null
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class BeerStyle < ApplicationRecord
end
