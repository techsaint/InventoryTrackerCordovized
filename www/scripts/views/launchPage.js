'use strict';

define([
	'backbone'
], function( Backbone ) {
	app.Views.LaunchPage = Backbone.View.extend( {
		el: '.hero-unit',

		template: _.template( $( '#launchPageTemplate' ).html() ),

		events: {
			'click .scan'	: 'scan',
			'click .lookUp'	: 'lookUp',
			'click .browse'	: 'browse'
		},

		render: function() {
			this.$el.html( this.template );
		},

		scan: function() {
			app.Router.router.navigate( 'scan', { trigger: true });
		},

		lookUp: function() {
			app.Router.router.navigate( 'lookUp', { trigger: true });
		},

		browse: function() {
			app.Router.router.navigate( 'browse', { trigger: true });
		}
	});
});
