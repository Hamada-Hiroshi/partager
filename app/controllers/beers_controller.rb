class BeersController < ApplicationController
  def top
    @current_user_props = { is_login: user_signed_in? }
  end

  def index
    beers = Beer.includes(:beer_style, :country)
                .where(beer_styles: { category: params[:category] })
    render json: { category: BeerStyle.categories_i18n[params[:category]],
                   beers: beers.as_json(include: [:beer_style, :country], methods: :sample_image_url) }
  end

  def image_search
    # 撮影した画像の読み取り
    image_data = params[:image_data]
    metadata = "data:image/jpeg;base64,"
    base64_string = image_data[metadata.size..]
    blob = Base64.decode64(base64_string)
    search_image = MiniMagick::Image.read(blob)

    # 画像から言語解析
    image_annotator = Google::Cloud::Vision.image_annotator
    res = image_annotator.text_detection(image: search_image.path, max_results: 1)
    # 画像から読み取ったtextを配列に変換
    keywords = res.responses[0].text_annotations[0]&.description&.split("\n")
    # キーワードをElasticsearchに投げて検索
    response = Beer.__elasticsearch__.search(keywords)
    if response.results.blank?
      return render json: { beer: nil } if response.results.blank?
    end
    result = response.results[0]._source
    beer = Beer.find(result.id)

    # 画像データをDB・S3に保存
    beer_image = current_user.drink_images.build(drink_id: beer.id, drink_type: Beer.to_s)
    beer_image.save!
    s3_client = Aws::S3::Client.new
    s3_client.put_object(bucket: ENV["AWS_S3_BUCKET"],
                         key: "beers/#{beer_image.id}.png",
                         content_type: "image/png",
                         body: File.open(search_image.path))

    render json: beer.as_json(include: [:beer_style, :country], methods: :sample_image_url)
  end
end
