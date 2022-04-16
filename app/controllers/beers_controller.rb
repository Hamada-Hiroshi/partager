class BeersController < ApplicationController
  def top
  end

  def index
    beers = Beer.includes(:beer_style, :country)
                .where(beer_styles: { category: params[:category] })
    @beers_props = { category: BeerStyle.categories_i18n[params[:category]],
                     beers: beers.as_json(include: [:beer_style, :country], methods: :sample_image_url) }
  end

  def image_search
    # # 撮影した画像の読み取り
    # image_data = params[:image_data]
    # metadata = "data:image/jpeg;base64,"
    # base64_string = image_data[metadata.size..]
    # blob = Base64.decode64(base64_string)
    # search_image = MiniMagick::Image.read(blob)
    #
    # # 画像から言語解析
    # image_annotator = Google::Cloud::Vision.image_annotator
    # res = image_annotator.text_detection(image: search_image.path, max_results: 1)
    # # 画像から読み取ったtextを配列に変換
    # keywords = res.responses[0].text_annotations[0]&.description&.split("\n")
    #
    # # 解析した単語でDB検索 -> Elasticsearch導入するまでの暫定処理
    # beers = Beer.none
    # keywords.each do |keyword|
    #   beers = beers.or(Beer.where("name LIKE ?", "%#{keyword}%"))
    # end
    # beer = beers[0]
    #
    # # 画像データをDB・S3に保存
    # beer_image = current_user.drink_images.build(drink_id: beer.id, drink_type: Beer.to_s)
    # beer_image.save!
    # s3_client = Aws::S3::Client.new
    # s3_client.put_object(bucket: ENV["AWS_S3_BUCKET"],
    #                      key: "beers/#{beer_image.id}.png",
    #                      content_type: "image/jpeg",
    #                      body: File.open(search_image.path))
    #
    beer = Beer.first
    render json: beer.as_json(include: [:beer_style, :country], methods: :sample_image_url)
  end
end
