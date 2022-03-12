class BeersController < ApplicationController
  def top
  end

  def image_search
    image_data = params[:image_data]
    metadata = "data:image/jpeg;base64,"
    base64_string = image_data[metadata.size..]
    blob = Base64.decode64(base64_string)
    search_image = MiniMagick::Image.read(blob)

    image_annotator = Google::Cloud::Vision.image_annotator
    res = image_annotator.text_detection(image: search_image.path, max_results: 1)
    # 画像から読み取ったtextを配列に変換
    keywords = res.responses[0].text_annotations[0]&.description&.split("\n")

    beers = Beer.none
    keywords.each do |keyword|
      beers = beers.or(Beer.where("name LIKE ?", "%#{keyword}%"))
    end

    render json: { beers: beers }
  end
end
