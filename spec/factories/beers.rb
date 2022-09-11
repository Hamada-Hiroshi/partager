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
FactoryBot.define do
  factory :beer do
    name { "MyString" }
    beer_style_id { 1 }
    country_id { 1 }
  end
end
