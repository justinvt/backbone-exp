

var Row = Backbone.Model.extend({
	url: "http://127.0.0.1/~justin/response.js",
	initialize: function(){
		this.set({
            htmlId: 'row_' + this.cid
        })
	}
});

var Table = Backbone.Collection.extend({
	model: Row,
	initialize: function(){}
});


var RowView = Backbone.View.extend({
	
	initialize: function (args) {
		_.bindAll(this, 'changeTitle');
		this.model.bind('change:title', this.changeTitle);
	},

	events: {
		'click .title': 'handleTitleClick'
	},


	render: function () {
		this.el = $("<div>dddddd</div>");
		return this;
	},

	changeTitle: function () {
		this.$('.title').text(this.model.get('title'));
	},

	handleTitleClick: function () {
		alert('you clicked the title: ' + this.model.get('title'));
	}

});

var RowAppModel = Backbone.Model.extend({
    initialize: function () {
        // init and store our MovieCollection in our app object
        this.table = new Table();
    }
});

var RowAppView = Backbone.View.extend({
    initialize: function () {
        // this.model refers the the model we pass to the view when we
        // first init our view. So here we listen for changes to the movie collection.
        this.model.table.bind('add', this.addRow);
        this.model.table.bind('remove', this.removeRow);
    },


	events: {
		// any user events (clicks etc) we want to respond to
	},


	// grab and populate our main template
	render: function () {
		this.el = $("<div>ssssssss</div>");
		// store a reference to our movie list
		this.table = this.$('table');

		return this;
	},


	addRow: function (row) {

		var view = new RowView({model: row});


		// here we use our stored reference to the movie list element and
		// append our rendered movie view.
		this.table.append(view.render().el);
	},


	removeRow: function (row) {

 		//here we can use the html ID we stored to easily find
		// and remove the correct element/elements from the view if the
		// collection tells us it's been removed.
		
		this.$('#' + row.get('htmlId')).remove();
	}
	
});

var RowAppController = {
    init: function (spec) {

        this.config = { };
		// extend our default config with passed in object attributes
		_.extend(this.config, spec);
		this.model = new RowAppModel({ });
		this.view  = new RowAppView({model: this.model});



		return this;
	},

	handlePubSubUpdate: function () {}
};

$(document).ready(function () {
	
	window.app = RowAppController.init({
		account: 'sss'
	});


	$('body').append(app.view.render().el);
	
});
