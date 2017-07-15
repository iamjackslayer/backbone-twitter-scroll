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
			url: 'https://nameless-spire-43337.herokuapp.com/static_pages/search/' + that.input + '/' + that.page,
			type: 'get',
			dataType: 'json',
			success: function(resp){
				console.log("success")
				var itemsAttr = resp.map(function(item){
					return item.attributes;
				});
				tweets.add(itemsAttr);
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
			this.clearViewList();
			this.test();
		}
	},
	request: function(){
		var queryInput = $(this.el).find('#search').val();
		console.log(queryInput);
		console.log('submitted request');
		query.set({input: queryInput});
		query.page = 1;
		query.request();
	},
	clearViewList: function(){
		$(viewList.el).html("");
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
		this.listenTo(this.collection,'add',this.loadResults);
	},
	render: function(){
		this.loadResults();
	},
	loadResults: function(){
		$(this.el).find('ul').append(this.template({tweets: this.collection.models.description}));
	},
	events:{
		'scroll':'checkScroll'
	},
	checkScroll: function(){
		var triggerPoint = 100;
		if(!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight){
			this.isLoading = true;
			query.page += 1;
			query.request();
			this.loadResults();
		}
	}
});

viewList = new TwitterWidget();


// Router---------------------------------------------------------------------------------
console.log("end");
});