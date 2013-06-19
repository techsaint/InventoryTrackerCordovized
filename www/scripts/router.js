'use strict';

define([
	'backbone',
	'collections/devices',
	'collections/departments',
	'views/launchPage',
	'views/scanPage',
	'views/lookUpPage',
	'views/browsePage'
], function( Backbone ) {
	app.Router.Router = Backbone.Router.extend( {

		routes: {
			''								: 'default',
			'launch'						: 'launchApp',
			'scan'							: 'launchScan',
			'lookUp'						: 'launchLookUp',
			'browse'						: 'launchBrowse',
			'list/devices'					: 'listDeviceTypes',
			'list/departments'				: 'listDepartments',
			'list/devices/:device'			: 'listModels',
			'list/departments/:department'	: 'listEmployees',
			'list/employee/:employee'		: 'listEmployeesDevices',
			'list/model/:model'				: 'listModelOwners',
			'device/:serial'				: 'showDevice'
		},

		initialize: function() {
			app.Views.launchPage = app.Views.launchPage || new app.Views.LaunchPage();
			app.Views.scanPage = app.Views.scanPage || new app.Views.ScanPage();
			app.Views.lookUpPage = app.Views.lookUpPage || new app.Views.LookUpPage();
			app.Views.browsePage = app.Views.browsePage || new app.Views.BrowsePage();
			app.Views.listPage = app.Views.listPage || new app.Views.ListPage();
			app.Views.devicePage = app.Views.devicePage || new app.Views.DevicePage();
		},

		default: function() {
			this.navigate( 'launch', { trigger: true });
		},

		launchApp: function() {
			app.Views.launchPage.render();
		},

		launchScan: function() {
			app.Views.scanPage.render();
		},

		launchLookUp: function() {
			app.Views.lookUpPage.render();
		},

		launchBrowse: function() {
			app.Views.browsePage.render();
		},

		listDeviceTypes: function() {
			app.Views.listPage.collection = app.Collections.devices;
			app.Views.listPage.collection2 = undefined;
			app.Views.listPage.listType = 'device';
			app.Views.listPage.listFilter = undefined;
			app.Views.listPage.callingAttribute = undefined;
			app.Views.listPage.showAttribute = 'type';
			app.Views.listPage.subText = undefined;
			app.Views.listPage.render();
		},

		listDepartments: function() {
			app.Views.listPage.collection = app.Collections.departments;
			app.Views.listPage.collection2 = undefined;
			app.Views.listPage.listType = 'department';
			app.Views.listPage.listFilter = undefined;
			app.Views.listPage.callingAttribute = undefined;
			app.Views.listPage.showAttribute = 'department';
			app.Views.listPage.subText = undefined;
			app.Views.listPage.render();
		},

		listModels: function( device ) {
			app.Views.listPage.collection = app.Collections.devices;
			app.Views.listPage.collection2 = undefined;
			app.Views.listPage.listType = 'model';
			app.Views.listPage.listFilter = device;
			app.Views.listPage.callingAttribute = 'type';
			app.Views.listPage.showAttribute = 'device';
			app.Views.listPage.subText = undefined;
			app.Views.listPage.render();
		},

		listEmployees: function( department ) {
			app.Views.listPage.collection = app.Collections.employees;
			app.Views.listPage.listType = 'employee';
			app.Views.listPage.listFilter = department;
			app.Views.listPage.callingAttribute = 'department';
			app.Views.listPage.showAttribute = 'name';
			app.Views.listPage.subText = undefined;
			app.Views.listPage.render();
		},

		listEmployeesDevices: function( employee ) {
			app.Views.listPage.collection = app.Collections.devices;
			app.Views.listPage.listType = 'asset';
			app.Views.listPage.listFilter = employee;
			app.Views.listPage.callingAttribute = 'owner';
			app.Views.listPage.showAttribute = 'device';
			app.Views.listPage.subText = 'serial';
			app.Views.listPage.render();
		},

		listModelOwners: function( model ) {
			app.Views.listPage.collection = app.Collections.devices;
			app.Views.listPage.listType = 'asset';
			app.Views.listPage.listFilter = model;
			app.Views.listPage.callingAttribute = 'device';
			app.Views.listPage.showAttribute = 'owner';
			app.Views.listPage.subText = 'serial';
			app.Views.listPage.render();
		},

		showDevice: function( serial ) {
			app.Views.devicePage.model = app.Collections.devices.find( function( device ) {
				return serial === device.get( 'serial' );
			});

			app.Views.devicePage.render();
		},

		getClickedElement: function( event ) {
			return $( event.target );
		},

		initializeStorage: function() {
			if (Modernizr.localstorage) {

			} else {

			}
			app.Collections.devices = new app.Collections.Devices([	{ id: 1, device: 'iPhone 4', type: 'phone', owner: 'Chris Butler', serial: 'AE8V43-QR10-A01', assigned: moment('2009-01-01 2:30', 'YYYY-MM-DD HH:mm'), expires: moment('2014-01-01 2:30', 'YYYY-MM-DD HH:mm'), lost: true },
																	{ id: 2, device: 'iPad 2', type: 'tablet', owner: 'Keith Gibbs', serial: 'BI658D-0RVB-A01', assigned: moment('2010-10-20 4:35', 'YYYY-MM-DD HH:mm'), expires: moment('2015-10-20 4:35', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 3, device: 'Nexus 10', type: 'tablet', owner: 'David Brown', serial: 'W2333B-DDVD-A01', assigned: moment('2010-4-18 11:00', 'YYYY-MM-DD HH:mm'), expires: moment('2015-4-18  11:00', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 4, device: 'iPad 2', type: 'tablet', owner: 'Patricia Cortes', serial: 'F4FKMI-004B-A01', assigned: moment('2011-12-20 15:44', 'YYYY-MM-DD HH:mm'), expires: moment('2016-12-20 15:44', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 5, device: 'iPad 3', type: 'tablet', owner: 'Jared Collier', serial: 'CCC65C-RT6B-A01', assigned: moment('2010-08-17 8:30', 'YYYY-MM-DD HH:mm'), expires: moment('2015-08-17 8:30', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 6, device: 'iPhone 5', type: 'phone', owner: 'Patricia Cortes', serial: 'F4T6UN-FIGO-A01', assigned: moment('2010-08-17 8:31', 'YYYY-MM-DD HH:mm'), expires: moment('2015-08-17 8:31', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 7, device: 'iPhone 5', type: 'phone', owner: 'Jared Collier', serial: 'D36607-45T4-A01', assigned: moment('2010-08-17 8:31', 'YYYY-MM-DD HH:mm'), expires: moment('2015-08-17 8:31', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 8, device: 'Kindle Fire HD', type: 'tablet', owner: 'Jared Collier', serial: 'DERVVT-CAEE-A01', assigned: moment('2008-10-02 12:15', 'YYYY-MM-DD HH:mm'), expires: moment('2012-10-02 12:15', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 9, device: 'Kindle Fire HD', type: 'tablet', owner: 'David Brown', serial: 'F49TN0-F19T-A01', assigned: moment('2008-10-02 12:15', 'YYYY-MM-DD HH:mm'), expires: moment('2013-01-02 12:15', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 10, device: 'Galaxy Note 8', type: 'tablet', owner: 'Chris Butler', serial: 'MIMMT0-9T9R-A01', assigned: moment('2012-11-11 4:30', 'YYYY-MM-DD HH:mm'), expires: moment('2017-11-11 4:30', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 11, device: 'iPad Mini', type: 'tablet', owner: 'Jared Collier', serial: 'EI59R2-FNBB-A01', assigned: moment('2011-11-11 4:31', 'YYYY-MM-DD HH:mm'), expires: moment('2016-11-11 4:31', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 12, device: 'MacBook Pro', type: 'laptop', owner: 'Jared Collier', serial: 'EI35BN-R989-A01', assigned: moment('2011-11-11 4:31', 'YYYY-MM-DD HH:mm'), expires: moment('2016-11-11 4:31', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 13, device: 'MacBook Pro', type: 'laptop', owner: 'Keith Gibbs', serial: 'A9R9T9-ERMC-A01', assigned: moment('2012-10-26 11:06', 'YYYY-MM-DD HH:mm'), expires: moment('2017-10-26 11:06', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 14, device: 'EliteBook 8570', type: 'laptop', owner: 'Matthew Curtis', serial: 'A1VVMB-EBC9-A01', assigned: moment('2008-07-15 13:32', 'YYYY-MM-DD HH:mm'), expires: moment('2013-04-15 13:32', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 15, device: 'EliteBook 8570', type: 'laptop', owner: 'Rachel Black', serial: 'P9PPUI-PNT5-A01', assigned: moment('2008-07-15 13:30', 'YYYY-MM-DD HH:mm'), expires: moment('2014-10-15 13:30', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 16, device: 'EliteBook 8580', type: 'laptop', owner: 'Catherine Cardon', serial: 'TYTT5X-L3KL-A01', assigned: moment('2013-04-28 14:01', 'YYYY-MM-DD HH:mm'), expires: moment('2018-04-28 14:01', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 17, device: 'EliteBook 8570', type: 'laptop', owner: 'Amy Chan', serial: 'Z4MP02-5IIT-A01', assigned: moment('2006-02-06 8:14', 'YYYY-MM-DD HH:mm'), expires: moment('2011-02-06 8:14', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 18, device: 'Blackberry Bold 9900', type: 'phone', owner: 'Jared Collier', serial: 'A1TT5C-0R0V-A01', assigned: moment('2010-09-16 10:10', 'YYYY-MM-DD HH:mm'), expires: moment('2015-09-16 10:10', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 19, device: 'Blackberry Bold 9900', type: 'phone', owner: 'David Brown', serial: 'B9QK5M-1IE8-A01', assigned: moment('2010-09-16 11:18', 'YYYY-MM-DD HH:mm'), expires: moment('2015-09-16 11:18', 'YYYY-MM-DD HH:mm'), lost: false },
																	{ id: 20, device: 'Blackberry Bold 9900', type: 'phone', owner: 'Rachel Black', serial: 'A9375C-4TRK-A01', assigned: moment('2010-09-16 9:56', 'YYYY-MM-DD HH:mm'), expires: moment('2015-09-16 9:56', 'YYYY-MM-DD HH:mm'), lost: false }, ]);

			app.Collections.departments = new app.Collections.Departments([	{ id: 1, department: 'Research' },
																			{ id: 2, department: 'Information Technology' },
																			{ id: 3, department: 'Sup and Reg' } ]);

			app.Collections.employees = new app.Collections.Employees([ { id: 1, name: 'Jared Collier', department: 'Information Technology' },
																		{ id: 2, name: 'Keith Gibbs', department: 'Information Technology' },
																		{ id: 3, name: 'Chris Butler', department: 'Information Technology' },
																		{ id: 4, name: 'David Brown', department: 'Research' },
																		{ id: 5, name: 'Patricia Cortes', department: 'Research' },
																		{ id: 6, name: 'Matthew Curtis', department: 'Research' },
																		{ id: 7, name: 'Rachel Black', department: 'Sup and Reg' },
																		{ id: 8, name: 'Catherine Cardon', department: 'Sup and Reg' },
																		{ id: 9, name: 'Amy Chan', department: 'Sup and Reg' } ]);
		}
	});
});