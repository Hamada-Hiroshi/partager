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
FactoryBot.define do
  factory :beer_style do
    name { "MyString" }
    groop { 1 }
  end
end
