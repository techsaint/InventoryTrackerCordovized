define([
	'backbone',
	'models/employee'
], function( Backbone ) {
	app.Collections.Employees = Backbone.Collection.extend ({
		model: app.Models.Employee
	});
});