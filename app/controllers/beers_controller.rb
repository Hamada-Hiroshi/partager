class BeersController < ApplicationController
  before_action :set_current_user_props, only: [:top, :index, :show]

  def top
  end

  def index
  end

  def show
  end

  def get_beers_ajax
    return render json: nil if params[:category].blank? && params[:keyword].blank?

    response = Beer.search(params)
    return render json: nil if response.results.blank?

    beers = response.records.records
    title =
      if params[:category].present?
        BeerStyle.categories_i18n[params[:category]]
      elsif params[:keyword].present?
        "#{params[:keyword]} の検索結果"
      end

    render json: {
      title: title,
      beers: beers.as_json(
        include: [:beer_style, :country],
        methods: [:sample_image_url, :content_image_url, :reviews_data]
      )
    }
  end

  def get_beer_info_ajax
    beer = Beer.find_by(id: params[:id])
    return render json: nil if beer.nil?

    render json: beer.as_json(
      include: [:beer_style, :country],
      methods: [:sample_image_url, :content_image_url, :reviews_data]
    )
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
    keyword = res.responses[0].text_annotations[0]&.description
    return render json: nil if keyword.blank?

    # キーワードをElasticsearchに投げて検索
    params = { keyword: keyword }
    response = Beer.search(params)
    return render json: nil if response.results.blank?

    # 画像データをDB・S3に保存
    result = response.results[0]._source
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
