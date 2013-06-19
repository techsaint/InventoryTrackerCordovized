'use strict';

define([
	'backbone',
	'collections/devices',
	'collections/departments'
], function( Backbone ) {
	app.Views.BrowsePage = Backbone.View.extend( {
		el: '.hero-unit',

		template: _.template( $( '#browsePageTemplate' ).html() ),

		events: {
			'click .devicesList'	: 'listDevices',
			'click .departmentsList': 'listDepartments'
		},

		render: function() {
			this.$el.html( this.template );
		},

		listDevices: function() {
			app.Router.router.navigate( 'list/devices', { trigger: true });
		},

		listDepartments: function() {
			app.Router.router.navigate( 'list/departments', { trigger: true });
		}
	});
});

