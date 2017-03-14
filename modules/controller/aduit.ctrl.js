'use strict';
/**
 * audit
 */
angular.module('core').controller('auditCtrl', ['$scope', 'commonService', '$http',function ($scope, commonService, $http) {
	$scope.sidebar = 'audit';
    $scope.flag = {};
    commonService.auditList().then(function(data){
    	console.log('success');
    	$scope.auditList = data.data.slice(0,20);
    	console.log($scope.auditList);
    });

    //分页器
	$scope.totalItems = 64;
	$scope.currentPage = 1;
	$scope.setPage = function (pageNo) {
	$scope.currentPage = pageNo;
	};
	$scope.pageChanged = function() {
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

    //跳转按钮
    $scope.getDumpOk = function(){
        $scope.setPage(getDumpVal());
    };

    //全选
    $scope.allSelected = function () {
        $(".table-list label>input").prop("checked",true);
    }
    //反选
    $scope.invertSelected = function () {
        $(".table-list label>input").prop("checked",false);
    }

    //单个选择
    $scope.updateSelection = function($event,item){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(action,item);
        $scope.delItemsTotals = delItems.length;
    }

    function updateSelected(action,item){
        var findIndex = delItems.indexOf(item);
        if(action == 'add' && findIndex == -1){
            delItems.push(item);
        }
        if(action == 'remove' && findIndex !=-1){
            delItems.splice(findIndex,1);
        }
    }
    //auditStatusShow
    $scope.auditStatusShow = function () {
        $scope.flag.auditStatus = !$scope.flag.auditStatus
    }
}]);