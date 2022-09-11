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
class Beer < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  # Elasticsearchの設定
  settings index: {
    number_of_shards: 1,
    number_of_replicas: 0
  }

  belongs_to :beer_style
  belongs_to :country
  has_many :images, class_name: "DrinkImage", as: :drink
  has_many :reviews, as: :drink

  validates :name, presence: true

  def sample_image_url
    sample_image = DrinkImage.find_by(drink_id: id, drink_type: Beer.to_s, is_sample: true)
    presigner = Aws::S3::Presigner.new
    presigner.presigned_url(:get_object, bucket: ENV["AWS_S3_BUCKET"],
                                         key: "beers/#{sample_image.id}.png",
                                         expires_in: 600)
  end

  def content_image_url
    presigner = Aws::S3::Presigner.new
    presigner.presigned_url(:get_object, bucket: ENV["AWS_S3_BUCKET"],
                                         key: "beer_contents/#{id}.png",
                                         expires_in: 600)
  end

  def save_image(user, image)
    beer_image = user.drink_images.build(drink_id: id, drink_type: Beer.to_s)
    beer_image.save!

    s3_client = Aws::S3::Client.new
    s3_client.put_object(bucket: ENV["AWS_S3_BUCKET"],
                         key: "beers/#{beer_image.id}.png",
                         content_type: "image/png",
                         body: File.open(image.path))
  end

  def reviews_data
    return nil if reviews.blank?
    average_score = (reviews.sum(:score).to_f / reviews.size).round(1)
    { average_score: average_score, count: reviews.size }
  end
end

