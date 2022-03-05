# == Schema Information
#
# Table name: drink_images
#
#  id         :bigint           not null, primary key
#  drink_type :string(255)      not null
#  is_sample  :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  drink_id   :integer          not null
#  user_id    :integer          not null
#
FactoryBot.define do
  factory :drink_image do
    user_id { 1 }
    drink_id { 1 }
    drink_type { "MyString" }
    is_sample { false }
  end
end
