'use strict';

define([
	'backbone',
	'collections/devices'
], function( Backbone ) {
	app.Views.ListPage = Backbone.View.extend( {
		el: '.hero-unit',

		template: _.template( $( '#listPageTemplate' ).html() ),

		events: {
			'click .device'			: 'listModels',
			'click .department'		: 'listEmployees',
			'click .employee'		: 'listEmployeesDevices',
			'click .model'			: 'listModelOwners',
			'click .asset'			: 'showAsset'
		},

		listModels: function( event ) {
			var clickedElement = app.Router.router.getClickedElement( event );
			var target = clickedElement.html();
			app.Router.router.navigate( 'list/devices/' + target, { trigger: true });
		},

		listEmployees: function( event ) {
			var clickedElement = app.Router.router.getClickedElement( event );
			var target = clickedElement.html();
			app.Router.router.navigate( 'list/departments/' + target, { trigger: true });
		},

		listEmployeesDevices: function( event ) {
			var clickedElement = app.Router.router.getClickedElement( event );
			var target = clickedElement.html();

			app.Router.router.navigate( 'list/employee/' + target, { trigger: true });
		},

		listModelOwners: function( event ) {
			var clickedElement = app.Router.router.getClickedElement( event );
			var target = clickedElement.html();

			app.Router.router.navigate( 'list/model/' + target, { trigger: true });
		},

		showAsset: function( event ) {
			var clickedElement = app.Router.router.getClickedElement( event );

			var target;

			if( clickedElement.hasClass( 'asset' ) || clickedElement.hasClass( 'subText' ) )
				target = clickedElement.find( '.serial' ).html();
			else if( clickedElement.hasClass( 'serial' ) )
				target = clickedElement.html();
			else
				target = clickedElement.siblings( '.serial' ).html();

			app.Router.router.navigate( 'device/' + target, { trigger: true });
		},

		render: function() {
			// this.callingAttribute	: the class of the button which caused this list to generate
			// this.listFilter			: the element that must be matched.  If a user clicked on tablet, only tablets should be displayed.
			//							  If a user clicks on an employee, only devices for that employee should be displayed
			// this.showAttribute		: the attribute of each model that should be displayed as button text
			// this.listType			: used in the template.  This is the class applied to each button in the generated list

			var filteredCollection;
			var listElements = [];
			var expires;

			if( this.listFilter ) {
				filteredCollection = this.collection.filter( function( element ) {
					return element.get( this.callingAttribute ) === this.listFilter;
				}, this );

				_.each(filteredCollection, function( element ) {
					expires = undefined;

					if ( element.get( 'expires' ) - moment() <= 0 )
						expires = element.get( 'expires' ).fromNow();
					if( this.subText )
						listElements.push( { showAttribute: element.get( this.showAttribute ), subText: element.get( this.subText ), expires: expires, lost: element.get( 'lost' ) } );
					else
						listElements.push( element.get( this.showAttribute ) );
				}, this );
			} else {
				listElements = this.collection.pluck( this.showAttribute );
			}

			var uniqueListElements = _.unique( listElements );

			this.$el.html( this.template({ listElements: uniqueListElements }) );
		}
	});
});

