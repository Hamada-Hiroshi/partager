source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.4'
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.5'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false
gem 'mini_magick'
gem 'rails-i18n', '~> 6.0'
gem 'enum_help'
gem 'dotenv-rails'
gem 'devise'
gem 'devise-i18n'
gem 'kaminari'
gem 'ransack'
gem 'slim-rails'
gem 'react_on_rails'
gem 'mini_racer', platforms: :ruby
gem 'paranoia'
gem 'bootstrap_form', git: 'https://github.com/bootstrap-ruby/bootstrap_form.git', branch: 'bootstrap-5'
gem 'google-cloud-vision'
gem 'aws-sdk-s3'
gem 'flag_icon_css_rails'
gem 'elasticsearch-model', '~> 7'
gem 'elasticsearch-rails', '~> 7'
gem 'bonsai-elasticsearch-rails', '~> 7'

group :development, :test do
  gem 'pry-byebug'
  gem 'better_errors'
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  gem 'listen', '~> 3.3'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'annotate'
  gem 'bullet'
  gem 'html2slim'

  gem 'capistrano'
  gem 'capistrano-rails'
  gem 'capistrano-rbenv'
  gem 'capistrano3-puma'
  gem 'ed25519'
  gem 'bcrypt_pbkdf'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'webdrivers'
end
