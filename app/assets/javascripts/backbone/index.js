console.log("Load ");
// Model---------------------------------------------------------------------------------
var Tweet = Backbone.Model.extend({

});

var Query = Backbone.Model.extend({
	defaults:{
		page: 1
	},
	request: function(){
		$.ajax({
			url: '/static_pages/search/' + this.input + '/' + this.page,
			method: 'get',
			dataType: 'json',
			success: function(resp){
				tweets.add(resp);
			} 
		});
	}
});

var query = new Query();

// Collection---------------------------------------------------------------------------------
var Tweets = Backbone.Collection.extend({
	model: Tweet
});

var tweets = new Tweet();


// View ---------------------------------------------------------------------------------
// form
var Form = Backbone.View.extend({
	el:'.form-group',
	events: {
		'click button':'request'
	},
	request: function(){
		var queryInput = $(this.el).find('#search').val();

		query.set({input: queryInput});
		query.page = 1;
		query.request();
	}
});
var form = new Form();

// results
var TwitterWidget = Backbone.View.extend({
	el:'.twitter-widget',
	className: 'col-md-12',
	template: _.template($('#template').html()),
	collection: tweets,
	initialize: function(){
		this.isLoading = false;
		this.listenTo(this.collection,'add',this.loadResults);
	},
	render: function(){
		this.loadResults();
	},
	loadResults: function(){
		$(this.el).find('ul').append(this.template({tweets: tweets}));
	},
	events:{
		'scroll':'checkScroll'
	},
	checkScroll: function(){
		var triggerPoint = 100;
		if(!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight){
			query.page += 1;
			query.request();
			this.loadResults();
		}
	}
});

var viewList = new TwitterWidget();


// Router---------------------------------------------------------------------------------