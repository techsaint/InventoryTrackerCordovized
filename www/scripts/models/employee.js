define([
	'backbone'
], function( Backbone ) {

	app.Models.Employee = Backbone.Model.extend ({
		defaults: {
			'id'			: undefined,
			'name'			: '',
			'department'	: ''
		}
	});

});