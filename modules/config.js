'use strict';

var ApplicationConfiguration = (function(){
	// 应用程序名和依赖
	var applicationModuleName = 'appname';
	var applicationModuleVendorDependencies = ['ui.router','ui.bootstrap'];

	// 添加新模块
	var registerModule = function(moduleName, dependencies) {
		angular.module(moduleName, dependencies || []);
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	var urls = {
        apiUrl: 'http://172.16.21.47:8080/bx/rs/TestRestServices/testRestMethod?str=15221113063'
        // wwwUrl: 'https://www.suncloud.cn',
        // panelApiUrl: 'https://panel.suncloud.cn/api/index.php?r=',
        // loginUrl: 'https://passport.suncloud.cn/index.php?client_id=panel'
    };

    var headerTitle = {
    	component:'云构件库',
    	audit:'我的审核',
    	uoload:"我的上传"
    }

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule,
		urls:urls

	};


})();