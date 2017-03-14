'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/component');

		$stateProvider.
		 state('login', {
			url:'/',
			templateUrl: 'template/core/login.html',
			data: {
				displayName: 'login'
			}
		}).state('component', {
			url:'/component',
			templateUrl: 'template/component/component.html',
			controller:'componentCtrl',
			data: {
				displayName: 'component'
			}
		}).state('upload',{
			url:'/upload',
			templateUrl:'template/component/upload.html',
			controller:'uploadCtrl',
			displayName:{
				displayName:"upload"
			}
		}).state('audit',{
			url:'/audit',
			templateUrl:'template/component/audit.html',
			controller:'auditCtrl',
			displayName:{
				displayName:"audit"
			}
		}).state('largePattern',{
			url:'/largePattern',
			templateUrl:'template/component/largePattern.html',
			controller:'largePatternCtrl',
			data:{
				displayName:"largePattern"
			}
		});
	}
]);