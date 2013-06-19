'use strict';

define([
	'backbone'
], function( Backbone ) {
	app.Views.DevicePage = Backbone.View.extend( {
		el: '.hero-unit',

		template: _.template( $( '#devicePageTemplate' ).html() ),

		render: function() {
			var expires;
			var expired;

			if ( this.model.get( 'expires' ) - moment() <= 0 )
				expired = this.model.get( 'expires' ).fromNow();
			else
				expires = this.model.get( 'expires' ).fromNow();

			this.$el.html( this.template({ model: this.model, expires: expires, expired: expired }) );
		}
	});
});

