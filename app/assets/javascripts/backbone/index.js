// Model
var Tweet = Backbone.Model();

// Collection
var Tweets = Backbone.Collection.extend({
	model: Tweet,
	url: function(){
		return 'http://'
	}
});


// View



// Router