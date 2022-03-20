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
  has_many :images, class_name: "DrinkImage", as: :drink

  validates :name, presence: true

  def sample_image_url
    sample_image = DrinkImage.find_by(drink_id: id, drink_type: Beer.to_s, is_sample: true)
    presigner = Aws::S3::Presigner.new
    presigner.presigned_url(:get_object, bucket: ENV["AWS_S3_BUCKET"],
                                         key: "beers/#{sample_image.id}.jpg",
                                         expires_in: 600)
  end
end
