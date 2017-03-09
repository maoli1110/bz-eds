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
			templateUrl:'template/component/component.html',
			data:{
				displayName:"upload"
			}
		}).state('audit',{
			url:'/audit',
			templateUrl:'template/component/component.html',
			displayName:{
				displayName:"audit"
			}
		});
	}
]);