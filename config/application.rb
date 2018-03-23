require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|  #_test,_helper,_coffee生成しない 20180318ADD
      g.javascripts false
      g.helper false
      g.test_framework false
    end
    config.i18n.default_locale = :ja #フラッシュメッセージ日本語読み込み 20180323ADD
  end
end