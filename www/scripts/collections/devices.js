define([
	'backbone',
	'models/device'
], function( Backbone ) {
	app.Collections.Devices = Backbone.Collection.extend ({
		model: app.Models.Device
	});
});