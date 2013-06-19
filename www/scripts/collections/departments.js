define([
	'backbone',
	'models/department'
], function( Backbone ) {
	app.Collections.Departments = Backbone.Collection.extend ({
		model: app.Models.Department
	});
});