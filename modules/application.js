'use strict';

// 定义主模块和添加依赖模块
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
    .config(function($httpProvider) {
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    })
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ])
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push(['$q',
                function($q) {
                    return {
                        // status < 300
                        response: function(response) {
                            var data = response.data;
                            // 统一处理result为false的情况
                            if (data.result && data.result == "false" && data.errormsg) {
                                alertService.add('danger', data.errormsg);
                            }
                            return response;
                        },
                        // status >= 400
                        responseError: function(rejection) {
                            switch (rejection.status) {
                                // 401 Unauthorized: jump to login page
                                case 401:
                                    location.pathname = membersysConfig.loginPage;
                                    break;
                                    // other Error
                                default:
                                    // alertService.add('danger', i18n.get('error.message'));
                            }

                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
        }
    ])
    .run(['$http','$rootScope','$state',
        function($http,$rootScope,$state) {
            // i18n get message
            // $http.get('lang.json').success(function(data) {
            //     i18n.set(data);
            // });
            $rootScope.$state = $state;
        }
    ]);

angular.element(document).ready(function() {
    if (window.location.hash === '#_=_') window.location.hash = '#!';
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
