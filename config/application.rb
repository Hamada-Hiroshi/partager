require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Partager
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    config.i18n.default_locale = :ja
    config.i18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}").to_s]

    config.time_zone = "Tokyo"
    config.active_record.default_timezone = :local

    config.sass.preferred_syntax = :sass

    config.action_view.field_error_proc = Proc.new { |html_tag, instance| html_tag }

    config.generators do |g|
      g.template_engine :slim
      g.test_framework :rspec, fixture: true, fixture_replacement: :factory_bot
      g.view_specs false
      g.routing_specs false
      g.helper_specs false
      g.request_specs false
      g.controller_specs false
      g.assets false
      g.helper false
    end
  end
end
