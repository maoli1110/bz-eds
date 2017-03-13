'use strict';
/**
 * component
 */
angular.module('core').controller('auditCtrl', ['$scope', 'commonService', '$http',function ($scope, commonService, $http) {
	$scope.sidebar = 'audit';
    commonService.auditList().then(function(data){
    	console.log('success');
    	$scope.auditList = data.data.slice(0,6);
    	console.log($scope.auditList);
    });

    /*
     * 分页器
     * */
	$scope.totalItems = 64;
	$scope.currentPage = 1;
	$scope.setPage = function (pageNo) {
	$scope.currentPage = pageNo;
	};
	$scope.pageChanged = function() {
	//console.log('Page changed to: ' + $scope.currentPage);
	};
	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
   
    /*分页器跳转
     * params  value
     * return currentPage
     * */
    function getDumpVal(){
        var dumpVal =  $('.dump-inp input').val();
        return dumpVal;
    }
    
    function setFilterStyle(obj,event){
        obj.on(event,function(){
            $(this).parent().siblings().css({'height':'auto','overflow':''})
        })
    }

    /*分页器跳转
     * params  value
     * return currentPage
     * */
    // $scope.setPage(getDumpVal());
    $scope.getDumpOk = function(){
        $scope.setPage(getDumpVal());
    };

}]);