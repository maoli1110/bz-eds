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
			controller:'componentCtrl',
			templateUrl: 'template/component/component.html',
			data: {
				displayName: 'component'
			}
		}).state('upload',{
			url:'/upload',
			controller:'uploadCtrl',
			templateUrl:'template/component/upload.html',
			data:{
				displayName:"upload"
			}
		}).state('audit',{
			url:'/audit',
			controller:'auditCtrl',
			templateUrl:'template/component/audit.html',
			displayName:{
				displayName:"audit"
			}
		});
			/*.state('modal',{
			url:'/modal',
			templateUrl:'template/core/modal.html',
			controller:'modalCtrl',
			displayName:{
				displayName:"modal"
			}
		});*/
	}
]);