Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'
  get 'static_pages/search/:query/:page' => 'static_pages#search'
  get 'static_pages' => 'static_pages#index'
end
