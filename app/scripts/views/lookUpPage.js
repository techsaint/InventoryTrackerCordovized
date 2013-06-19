'use strict';

define([
	'backbone'
], function( Backbone ) {
	app.Views.LookUpPage = Backbone.View.extend( {
		el: '.hero-unit',

		template: _.template( $( '#lookUpPageTemplate' ).html() ),

		events: {
			'click .submitLookUp'	: 'submitLookUp',
		},

		render: function() {
			this.$el.html( this.template );
		},

		submitLookUp: function() {
			console.log('submit device number look up');
		},
	});
});
