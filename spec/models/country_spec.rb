# == Schema Information
#
# Table name: countries
#
#  id           :integer          not null, primary key
#  abbreviation :string(255)      not null
#  name         :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'rails_helper'

RSpec.describe Country, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
