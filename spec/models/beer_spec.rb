# == Schema Information
#
# Table name: beers
#
#  id            :integer          not null, primary key
#  label_text    :text(65535)
#  name          :string(255)      not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  beer_style_id :integer          not null
#  country_id    :integer          not null
#
require 'rails_helper'

RSpec.describe Beer, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
