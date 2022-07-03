# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  comment    :text(65535)
#  drink_type :string(255)      not null
#  score      :float(24)        not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  drink_id   :integer          not null
#  user_id    :integer          not null
#
require 'rails_helper'

RSpec.describe Review, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
