class StaticPagesController < ApplicationController
	def index
		client = Twitter::REST::Client.new do |config|
		  config.consumer_key = '2ata698MwiwPUAMxXg2Na99c1'
		  config.consumer_secret = 'MC3UuF6OA8WkJjORxfqSEQVlEVs5TGlUwzHkDRI4UX5yotQz5n'
		  config.access_token = '2925112608-EtrVoSRCKK2pHTxCTu2S8sKZXbiJ1O45p5PQVfR'
		  config.access_token_secret = 'OPcK8sjXWq6lERiL6vsuTpHoDwSQ1qOBpOqW9vrC8ZmB2'
		end
		@tweets = client.user_timeline('rubyinside',count: 20) 
	end

	def search
		client = Twitter::REST::Client.new do |config|
		  config.consumer_key = '2ata698MwiwPUAMxXg2Na99c1'
		  config.consumer_secret = 'MC3UuF6OA8WkJjORxfqSEQVlEVs5TGlUwzHkDRI4UX5yotQz5n'
		  config.access_token = '2925112608-EtrVoSRCKK2pHTxCTu2S8sKZXbiJ1O45p5PQVfR'
		  config.access_token_secret = 'OPcK8sjXWq6lERiL6vsuTpHoDwSQ1qOBpOqW9vrC8ZmB2'
		end
		@tweets = client.user_timeline('rubyinside',count: 20)

		render json: @tweets
	end
end
