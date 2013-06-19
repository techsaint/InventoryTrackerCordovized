define([
	'backbone'
], function( Backbone ) {

	app.Models.Department = Backbone.Model.extend ({
		defaults: {
			'id'	: undefined,
			'name'	: ''
		}
	});

});