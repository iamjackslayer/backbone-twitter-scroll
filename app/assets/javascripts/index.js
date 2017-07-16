// change underscore syntax
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

// Model
var tweet;
var query;
// COllection
var tweets;
// view
var form;
var viewList;
var windowView;


$(document).ready(function(){

console.log("Load ");
// Model---------------------------------------------------------------------------------
var Tweet = Backbone.Model.extend({

});

var Query = Backbone.Model.extend({
	defaults:{
		page: 1
	},
	request: function(){
		var that = this;
		$.ajax({
			url: 'https://nameless-spire-43337.herokuapp.com/static_pages/search/' + that.attributes.input + '/' + that.attributes.page,
			type: 'get',
			dataType: 'json',
			success: function(resp){
				console.log("success");
				console.log(resp);
				
				tweets.reset(resp);
				viewList.isLoading = false;
			},
			error: function(){
				console.log("ajax error :)");
			},
			complete: function(){
				console.log("completed ajax request yo");
			}
		});
	}
});

query = new Query();

// Collection---------------------------------------------------------------------------------
var Tweets = Backbone.Collection.extend({
	model: Tweet
});

tweets = new Tweets();


// View ---------------------------------------------------------------------------------
// form
var Form = Backbone.View.extend({
	el:'#inputForm',
	events: {
		'click .btn':function(e){
			this.request();
			this.test();
			this.clearList();
		}
	},
	request: function(){
		var queryInput = $(this.el).find('#search').val();
		console.log(queryInput);
		console.log('submitted request');
		query.set({input: queryInput});
		query.attributes.page = 1;
		query.request();
	},
	clearList: function(){
		$(viewList.el).find('ul').html("");
	},
	test: function(){
		console.log("test event activated");
	}
});
form = new Form();

// results
var TwitterWidget = Backbone.View.extend({
	el: '.twitter-widget',
	template: _.template($('#template').html()),
	collection: tweets,
	initialize: function(){
		this.isLoading = false;
		this.listenTo(this.collection,'reset',this.loadResults);
		$(document).on('scroll',function(){
			this.checkScroll();
		}.bind(this));
	},
	render: function(){
		this.loadResults();
	},
	loadResults: function(){
		console.log("data appended to the template");
		$(this.el).find('ul').append(this.template({tweets: this.collection.models}));
	},
	checkScroll: function(){
		console.log("scrolling.....................................................");
		var triggerPoint = 100;
		if(!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight){
			this.isLoading = true;
			query.attributes.page += 1;
			query.request();
			this.loadResults();
		}
	}
});

viewList = new TwitterWidget();


// Router---------------------------------------------------------------------------------
console.log("end");
});