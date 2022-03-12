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
require 'rails_helper'

RSpec.describe BeerStyle, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
