class BeersController < ApplicationController
  before_action :set_current_user_props, only: [:top, :show]

  def top
  end

  def index
    if request.xhr?
      beers = Beer.
        includes(:beer_style, :country).
        where(beer_styles: { category: params[:category] })
      render json: {
        category: BeerStyle.categories_i18n[params[:category]],
        beers: beers.as_json(
          include: [:beer_style, :country],
          methods: [:sample_image_url, :content_image_url, :reviews_data]
        )
      }
    else
      set_current_user_props
    end
  end

  def show
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
    keyword = res.responses[0].text_annotations[0]&.description
    return render json: nil if keyword.blank?
    # キーワードをElasticsearchに投げて検索
    response = Beer.search_by_keyword(keyword)
    return render json: nil if response.results.blank?
    result = response.results[0]._source

    # 画像データをDB・S3に保存
    beer = Beer.find(result.id)
    beer.save_image(current_user, search_image)

    render json: beer.as_json(
      include: [:beer_style, :country],
      methods: [:sample_image_url, :content_image_url, :reviews_data]
    )
  end

  def no_search_result
  end
end
