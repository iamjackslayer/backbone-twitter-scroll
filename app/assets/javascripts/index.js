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
var loadingSpinner;

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
			},
			error: function(){
				console.log("ajax error :)");
			},
			complete: function(){
				console.log("completed ajax request yo");
				// submit button
				$('#butt').prop({'disabled':false});
				// spinner and viewList
				viewList.isLoading = false;
				loadingSpinner.hide();
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
// loading-spinner

var LoadingSpinner = Backbone.View.extend({
	el:'#loading-spinner',
	initialize: function(){
		$(this.el).hide();
	},
	hide: function(){
		$(this.el).hide();
	},
	show: function(){
		$(this.el).show();
	}

});

loadingSpinner = new LoadingSpinner();
// form
var Form = Backbone.View.extend({
	el:'#inputForm',
	events: {
		'click .btn':function(e){
			this.request();
			this.test();
			this.clearList();

			// Spinner and viewList
			viewList.isLoading = true;
			loadingSpinner.show();
		}
	},
	request: function(){
		var queryInput = $(this.el).find('#search').val();
		$('#butt').prop({'disabled':true});
		console.log(queryInput);
		console.log('submitted request');
		query.set({input: queryInput});
		query.attributes.page = 1;
		query.request();
	},
	clearList: function(){
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
		this.listenTo(this.collection,'reset',this.loadResults);
		$('body').on('scroll',function(){
			this.checkScroll();
		}.bind(this));
	},
	render: function(){
		this.loadResults();
	},
	loadResults: function(){
		console.log("data appended to the template");
		$(this.el).append(this.template({tweets: this.collection.models}));
	},
	checkScroll: function(){
		console.log("scrolling.....................................................");
		var triggerPoint = 100;
		if(!this.isLoading && $('body')[0].scrollTop + $(window)[0].innerHeight + triggerPoint > $('body')[0].scrollHeight){
			console.log('adding data from scrolling,');
			console.log('scrollTop: '+ this.el.scrollTop);
			console.log('clientHeight: ' + this.el.clientHeight);
			console.log('scrollHeight: ' + this.el.scrollHeight);
			this.isLoading = true;
			// spinner
			loadingSpinner.show();
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