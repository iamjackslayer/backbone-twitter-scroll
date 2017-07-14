class StaticPagesController < ApplicationController
	def index
		@tweets =client.user_timeline('rubyinside',count: 20) 
	end
end
