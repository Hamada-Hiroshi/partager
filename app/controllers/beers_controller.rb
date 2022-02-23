class BeersController < ApplicationController
  def image_seach
    image_data = params[:image_data]
    metadata = "data:image/jpeg;base64,"
    base64_string = image_data[metadata.size..-1]
    blob = Base64.decode64(base64_string)
    search_image = MiniMagick::Image.read(blob)

    image_annotator = Google::Cloud::Vision.image_annotator
    res = image_annotator.text_detection(image: search_image.path, max_results: 1)
    # 画像から読み取ったtextを配列に変換
    search_words = res.responses[0].text_annotations[0]&.description&.split("\n")

    render json: { words: search_words }
  end
end
