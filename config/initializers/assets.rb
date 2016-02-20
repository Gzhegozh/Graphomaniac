# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile += %w( style.scss )
Rails.application.config.assets.precompile += %w( logo.png )
Rails.application.config.assets.precompile += %w( head.css )
Rails.application.config.assets.precompile += %w( left_sidebar.css )
Rails.application.config.assets.precompile += %w( right_sidebar.css )
Rails.application.config.assets.precompile += %w( chapters.css )
Rails.application.config.assets.precompile += %w( simplePagination.css )
Rails.application.config.assets.precompile += %w( jquery.simplePagination.js )
Rails.application.config.assets.precompile += %w( comments.css )
# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css.sass, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
