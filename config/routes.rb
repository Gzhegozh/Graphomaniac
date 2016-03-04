Rails.application.routes.draw do

  resources :bookmarks
  resources :chapters
  resources :records, only: :index do
    collection do
      post :import
      get :autocomplete
    end
  end

  resources :records do
    resources :comments
  end
  devise_for :users, :controllers => {registrations: 'user/registrations',
                                      sessions: 'user/sessions',
                                      passwords: 'user/passwords',
                                      records: 'records',
                                      omniauth_callbacks: 'user/omniauth_callbacks'}

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

  # You can have the root of your site routed with "root"
  root 'records#index'

  get 'search' => 'search#search'

  get 'records/user/:id' => 'records#show_user_records'
  get 'records/:id/chapters/bookmarks' => 'bookmarks#insert_bookmarks'
  get 'records/chapters/bookmarks' => 'bookmarks#insert_bookmarks'

  get 'get_genres/:category_id' => 'search#get_genres'
  get 'get_genres' => 'search#get_genres'
  get 'records/:id/get_genres/:category_id' => 'search#get_genres'
  get 'records/get_genres/:category_id' => 'search#get_genres'
  post 'chapters/reorder/:order' => 'chapters#reorder'
  delete 'comments/:id' => 'comments#destroy'
  #get 'users/sign_up'   => 'user/registrations#new'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
