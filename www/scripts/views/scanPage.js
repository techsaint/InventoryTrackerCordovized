'use strict';

define([
	'backbone'
], function( Backbone ) {
	app.Views.ScanPage = Backbone.View.extend( {
		el: '.hero-unit',

		template: _.template( $( '#scanPageTemplate' ).html() ),

		events: {
			'click .submitScan' : 'submitScan'
		},

		render: function() {
			this.$el.html( this.template );
		},

		submitScan: function() {
			console.log('submit scan');
		}
	});
});
